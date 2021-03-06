import React, { useEffect } from "react";
import './styles/GalleryCard.css'
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineFavorite, MdShoppingBasket } from 'react-icons/md'
import { localstorage } from '../redux/actions/storageActions'
import { postProducts, totalProduct } from '../redux/actions/allProductsActions'
import { getGalleryById, getAllGallery } from '../redux/actions/galleryActions'
// import { postOrder } from '../redux/actions/orderAction'
import { NavLink } from 'react-router-dom';
import Img from "react-cool-img";
// import Cookies from "universal-cookie";
import { Card, Button } from 'antd';
import 'antd/dist/antd.min.css';


const GalleryCard = (props) => {
    const dispatch = useDispatch();
    const artworkShop = useSelector(state => state.galleryReducer.allGallery);
    const { storage } = useSelector(state => state.storageReducer);

    const filterId = useSelector(state => state.galleryReducer.filterId);
    //console.log("storage", storage)

    const { Meta } = Card;
    // const cookies = new Cookies();
    const user = localStorage?.session ? JSON.parse(localStorage.session) : null;
    //console.log("filterId", filterId)

    useEffect(() => {
        // storing input name
        let id = props.id
        if (getAllGallery === artworkShop) {
            dispatch(getGalleryById(id))
            dispatch(getAllGallery())
        }

        localStorage.setItem(`${storage?.id}`, JSON.stringify(storage));

        const allStorage = () => {
            var values = []
            var keys = Object.keys(localStorage)
            var i = keys.length;

            while (i--) {

                if (parseInt(keys[i])) {
                    values.push(JSON?.parse(localStorage?.getItem(keys[i])));
                }

            }
            const newValue = []
            for (let i = 0; i < values.length; i++) {
                for (let j = 0; j < artworkShop.length; j++) {
                    if (artworkShop[j].stock === false && artworkShop[j].id === values[i].id) {
                        values[i].price = 0
                    }
                }
            }
            if (newValue === undefined || newValue === null) {
                newValue = []
            }
            dispatch(postProducts(values));
        }

        allStorage()
        dispatch(totalProduct())

    }, [storage, dispatch]);


    const handleAddShop = () => {


        let id = props.id
        dispatch(getGalleryById(id))

        // if (filterId?.stock === true && filterId?.id === id) {
        let findGallery = artworkShop.find(element => element.id === Number(id) && element.stock === true)
        dispatch(localstorage(findGallery))
        // }
        // else{
        //     dispatch(getGalleryById(id))
        //     alert("Obra comprada")
        // }

    }

    return (
        <Card
            style={{ width: 230 }}
            cover={
                props.className === 'galleryCardSold' ?
                    <>
                        <Img
                            alt="example"
                            src={props.img}
                            className='galleryCardSold'
                        />
                        <h4 className='H4CardSold'>Sold out</h4>
                    </>
                    :
                    <Img
                        alt="example"
                        src={props.img}
                        className='card__img-avatar'
                    />
            }
            actions={
                user !== null ? !user[0]?.roles?.includes('ROLE_ADMIN') ? [
                    <Button className="detail--button" onClick={handleAddShop} type="primary" disabled={localStorage.getItem(props.id) || props?.stock === false ? true : false}><MdShoppingBasket style={{ fontSize: '18px', color: '#A3DA8D' }} />Add To Cart</Button>
                ] : null : [
                    <Button className="detail--button" onClick={handleAddShop} type="primary" disabled={localStorage.getItem(props.id) || props?.stock === false ? true : false}><MdShoppingBasket style={{ fontSize: '18px', color: '#A3DA8D' }} /></Button>
                ]}
        >
            <NavLink to={`/${props.id}`} >
                <Meta
                    // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={props.title}
                    description={<span className='gallery_card-price'>$ {props.price}</span>}
                />
            </NavLink>
        </Card>
    );
}

export default GalleryCard;

