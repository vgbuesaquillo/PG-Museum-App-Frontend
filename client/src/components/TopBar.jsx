import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./styles/TopBar.css";
import { NavLink } from "react-router-dom"
import { AiOutlineSearch } from 'react-icons/ai';
import { MdShoppingBasket } from 'react-icons/md';
import {CgProfile} from 'react-icons/cg';
import { getFindGallery, getAllGallery } from '../redux/actions/galleryActions'
import SortInput from "./SortInput";
import Cookies from 'universal-cookie'


function TopBar() {

    const dispatch = useDispatch()
    const cookies = new Cookies();
    const login = cookies.get('session')

    const total = useSelector(state => state.allProductsReducer.totalCount)
    const [input, setInput] = useState({
        search: ''
    })

    const handleSearch = (e) => {
        setInput({ ...input.search, search: e.target.value })
    }

    useEffect(() => {
        if (input.search) {

            dispatch(getFindGallery(input.search))
        } else {
            dispatch(getAllGallery())
        }
    }, [dispatch, input.search, total])

    return (
        <div className="topbar">
            <div className="topbar__content">
                <div className="searchForm">
                    <AiOutlineSearch className="searchForm__icon" />
                    <input className="search__input" placeholder="Search here..." onChange={handleSearch} value={input.search} />
                </div>
                  <SortInput/>
                <div className='cart'>
                    <div className='cart__content'>
                        <MdShoppingBasket className='cart__icon' />
                        <span>${total}</span>
                    </div>
                </div>
                <div className='loginButtons'>
                    {
                        cookies.get('session') ?
                        <NavLink to='/admin'>
                            <div>
                                <CgProfile/>
                                <label>{login.username}</label>
                            </div> 
                        </NavLink> :
                        <div>
                                <button className='loginButtons__button'>
                                <NavLink to="/Login">Login</NavLink>
                            </button>

                            <button className='loginButtons__button'>
                                <NavLink to="/signup">Create Account</NavLink>
                            </button>
                        </div>
                    }

                    

                </div>

            </div>

        </div>
    )
}

export default TopBar
