import React, { useEffect, useState } from "react";
import './styles/GalleryCard.css'
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineFavorite, MdShoppingBag } from 'react-icons/md'
import { localstorage, postProducts,totalProduct } from '../redux/actions/index'
import { NavLink } from 'react-router-dom';


const GalleryCard = (props) => {
    const dispatch = useDispatch();
    const artworkShop = useSelector(state => state.allGallery);
    const storage = useSelector(state => state.storage);

    useEffect(() => {
        // storing input name
        localStorage.setItem(`${storage?.id}`, JSON.stringify(storage));
        const allStorage = () => {
    
            var values = []
            var keys = Object.keys(localStorage)
            var i = keys.length;
        
            while ( i-- ) {
                values.push(JSON.parse(localStorage.getItem(keys[i])));
            }
        
            dispatch(postProducts(values));
        }
        
        allStorage()
        dispatch(totalProduct())

    }, [storage]);
    
    const handleAddShop = () => {
        let id = props.id
        let findGallery = artworkShop.find(element => element.id === Number(id))
        dispatch(localstorage(findGallery))
    }

    return (
        <div className='gallery_card'>
            <NavLink to={`/${props.id}`}>
            <div className='card__img'>
                    <img src={props.img} alt={props.title} className='card__img-avatar' />
            </div>
            </NavLink>
            <NavLink to={`/${props.id}`} className='gallery_card-router'>
                <label className='gallery_card-title'>
                    {props.title}
                </label>
            </NavLink>
            <div className='gallery_card-actions'>
                <span className='gallery_card-price'>$ {props.price}</span>
                <div className='gallery_card-functions'>
                    <MdShoppingBag onClick={handleAddShop} />
                    {/* <MdOutlineFavorite /> */}
                </div>
            </div>
        </div>
    );
}

export default GalleryCard;

