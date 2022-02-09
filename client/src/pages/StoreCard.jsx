import './styles/StoreCard.css'
import { BiChevronLeftCircle } from "react-icons/bi";
import { BiChevronRightCircle } from "react-icons/bi";
import { useState, useEffect } from 'react'
import { postProducts, totalProduct } from '../redux/actions/allProductsActions'
import { postOrder } from '../redux/actions/orderAction'
import { useDispatch, useSelector } from 'react-redux'
import { localstorage } from '../redux/actions/storageActions'
import { Link } from 'react-router-dom';
import { getGalleryById } from '../redux/actions/galleryActions';


//props destructure for easier use in code - destructure a props para facilitar uso en código
function StoreCard({ info, editOptions }) {

  const artworkShop = useSelector(state => state.galleryReducer.allGallery);
  const filterId = useSelector(state => state.galleryReducer.filterId);
  const user = localStorage?.session ? JSON.parse(localStorage.session) : null
  const { id, images: url, title, stock, price } = info
  const dispatch = useDispatch()
  console.log("info", info)
  console.log("filterId", filterId)


  useEffect(() => {
    dispatch(getGalleryById(id))
    // dispatch(totalProduct())
    if (filterId?.stock === false && filterId?.id === Number(id)) {
      deleteItem()
    }
  }, [dispatch, filterId])

  const deleteItem = () => {

    localStorage.removeItem(`${id}`)

    var values = []
    var keys = Object.keys(localStorage)
    var i = keys.length;

    while (i--) {
      if (parseInt(keys[i])) {
        values.push(JSON?.parse(localStorage?.getItem(keys[i])));
      }
    }
    // const stockB = values.map(el => {
    //   if (el.stock === false) {
    //     return el.stock
    //   }
    // })
    dispatch(postProducts(values))
    dispatch(localstorage(values))

  }

  console.log(info);
  //saves item info to localstorage to prevent render lag - Guarda info del item en localstorage para prevenir atraso de frames
  const toLocal = () => {
    localStorage.setItem("itemInfo", JSON.stringify(info))
  }


  const handleAddShop = () => {
    let id = info.id
    let findGallery = artworkShop.find(element => element.id === Number(id))
    let arr = []
    let arr2 = []
    arr.push(info.id)
    arr2.push(info.createdAt)
    dispatch(localstorage(findGallery))
    dispatch(postOrder(arr2, info.price, user[0].id, arr, findGallery.images))
  }

  return (
    stock ?
      <div className="card_cont">
        <div>
          <img
            height={205}
            src={url}
            alt={title}
          />
        </div>
        <div className="card__info">
          <div><h2>{title}</h2></div>
          <div><h4>Pricing: $ {' ' + price}</h4></div>
        </div>
        <div className="card_bott">
          <button className="btn_green" onClick={user ? handleAddShop : () => alert("Registrate para comprar")}><b>Buy</b></button>
          <button className='btn_red' onClick={deleteItem}>Delete</button>
          {editOptions === true ?
            <Link to={`/admin/edit-product/${id}`}>
              <button className='btn_green' onClick={toLocal}>
                Edit
              </button>
            </Link>
            : null}
        </div>
      </div>
      :
      <div className="card_cont">
        <div>
          <img
            height={205}
            src={url}
            alt={title}
          />
        </div>
        <div className="card__info">
          <div><h2>Sorry, this work has been SOLD</h2></div>
          <div><h4>Pricing: $ {0}</h4></div>
        </div>
        <div className="card_bott">
          <button className="btn_green" onClick={user ? handleAddShop : () => alert("Registrate para comprar")}><b>Buy</b></button>
          <button className='btn_red' onClick={deleteItem}>Delete</button>
          {editOptions === true ?
            <Link to={`/admin/edit-product/${id}`}>
              <button className='btn_green' onClick={toLocal}>
                Edit
              </button>
            </Link>
            : null}
        </div>
      </div>
  )
}

export default StoreCard;
