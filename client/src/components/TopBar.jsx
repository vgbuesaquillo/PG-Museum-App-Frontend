import { useNavigate } from "react-router-dom";
import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import "./styles/TopBar.css";
import { NavLink } from "react-router-dom"
import { AiOutlineSearch } from 'react-icons/ai';
import { MdShoppingBasket } from 'react-icons/md';
import {getFindGallery, getAllGallery} from '../redux/actions/galleryActions'
import SortInput from "./SortInput";


function TopBar() {

    const dispatch = useDispatch()
    const total = useSelector(state => state.allProductsReducer.totalCount)
    const [input, setInput] = useState({
        search: ''
    })

    const handleSearch = (e) => {
        setInput({...input.search, search: e.target.value})
    }

    useEffect(()=> {
        if (input.search) {
            
            dispatch(getFindGallery(input.search))
        } else{
            dispatch(getAllGallery())
        }
    }, [dispatch, input.search, total])

    return (
        <div className="topbar">
            <div className="topbar__content">
                <div className="searchForm">
                    <AiOutlineSearch className="searchForm__icon" />
                    <input className="search__input" placeholder="Search here..." onChange={handleSearch} value={input.search} />

                  <SortInput/>

                </div>
                <div className='cart'>
                    <div className='cart__content'>
                        <MdShoppingBasket className='cart__icon' />
                        <span>${total}</span>
                    </div>
                </div>
                <div className='loginButtons'>

                    <button className='loginButtons__button'>
                        <NavLink to="/Login">Login</NavLink>
                    </button>

                    <button className='loginButtons__button'>
                        <NavLink to="/signup">Create Account</NavLink>
                    </button>

                </div>

            </div>

        </div>
    )
}

export default TopBar
