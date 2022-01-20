import { useNavigate } from "react-router-dom";
import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import "./styles/TopBar.css";
import { NavLink } from "react-router-dom"
import { AiOutlineSearch } from 'react-icons/ai';
import { GrFilter } from 'react-icons/gr';
import { MdShoppingBasket } from 'react-icons/md';
import {getFindGallery, getAllGallery} from '../redux/actions'

function TopBar() {

    const dispatch = useDispatch()
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
    }, [dispatch, input.search])

    return (
        <div className="topbar">
            <div className="topbar__content">
                <div className="searchForm">
                    <AiOutlineSearch className="searchForm__icon" />
                    <input className="search__input" placeholder="Search here..." onChange={handleSearch} value={input.search} />
                    <GrFilter className="searchForm__icon" />
                </div>
                <div className='cart'>
                    <div className='cart__content'>
                        <MdShoppingBasket className='cart__icon' />
                        <span>$0.00</span>
                    </div>
                </div>
                <div className='loginButtons'>

                    <button className='loginButtons__button'>
                        <NavLink to="/login">Login</NavLink>
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
