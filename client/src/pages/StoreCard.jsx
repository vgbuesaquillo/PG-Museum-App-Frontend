import './styles/StoreCard.css'
import { BiChevronLeftCircle } from "react-icons/bi";
import { BiChevronRightCircle } from "react-icons/bi";
import { useState, useEffect } from 'react'
import { postProducts, totalProduct } from '../redux/actions/allProductsActions'
import { useDispatch } from 'react-redux'
import { localstorage } from '../redux/actions/storageActions'
import { Link } from 'react-router-dom';


//props destructure for easier use in code - destructure a props para facilitar uso en código
function StoreCard({info, editOptions}) {
  const {id, images:url, title, pricing} = info
  const dispatch = useDispatch()

  useEffect(() => {

    // dispatch(totalProduct())
  }, [dispatch])

  const deleteItem = () => {

    localStorage.removeItem(`${id}`)

    var values = []
    var keys = Object.keys(localStorage)
    var i = keys.length;

    while (i--) {
      if (keys.length === 0) {
      }
      values.push(JSON.parse(localStorage.getItem(keys[i])));

    }
    dispatch(postProducts(values))
    dispatch(localstorage(values))
  }

  //saves item info to localstorage to prevent render lag - Guarda info del item en localstorage para prevenir atraso de frames
  const toLocal = ()=>{
    localStorage.setItem("itemInfo", JSON.stringify(info))
  }

  return (

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
        <div><h4>Pricing: $ {' ' + pricing}</h4></div>
      </div>
      <div className="card_bott">
        {/* <button className="btn_green"><b>Buy</b> </button> */}
        <button className='btn_red' onClick={deleteItem}>Delete</button>
        {editOptions === true ?
          <Link to={`/admin/edit-product/${id}`}>
            <button className='btn_green' onClick={toLocal}>
              Edit
            </button>
          </Link>
        :null}
      </div>
    </div>
  )
}

export default StoreCard;