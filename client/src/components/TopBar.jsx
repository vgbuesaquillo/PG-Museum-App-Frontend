// import { useNavigate } from "react-router-dom";
// import { AiOutlineSearch } from 'react-icons/ai';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./styles/TopBar.css";
import { NavLink } from "react-router-dom"
import { MdShoppingBasket } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { getFindGallery, getAllGallery } from '../redux/actions/galleryActions'
import SortInput from "./SortInput";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Cookies from 'universal-cookie'

function TopBar() {
    const dispatch = useDispatch()
    const cookies = new Cookies();
    const login = cookies.get('session')

    const total = useSelector(state => state.allProductsReducer.totalCount)
    const items = useSelector(state => state.galleryReducer.allGallery)
    const [input, setInput] = useState({
        search: ''
    })

    useEffect(() => {
        if (input.search) {

            dispatch(getFindGallery(input.search))
        } else {
            dispatch(getAllGallery())
        }
    }, [dispatch, input.search, total])

    const handleOnSearch = (string, results) => {
        setInput({ ...input.search, search: string })
    }

    const handleOnSelect = (item) => {
        setInput({ ...input.search, search: item.title })
    }

    const handleOnClear = () => {
        setInput({ ...input.search, search: '' })
    }

    return (
        <div className="topbar">
            <div className="topbar__content">
                <div className="searchForm">
                    <div >
                        <ReactSearchAutocomplete
                            items={items}
                            className="search__input"
                            placeholder="Search here..."
                            onSearch={handleOnSearch}
                            onSelect={handleOnSelect}
                            onClear={handleOnClear}
                            value={input.search}
                            fuseOptions={{ keys: ["title", "description"] }} // Search on both fields
                            resultStringKeyName="title" // String to display in the results
                            showIcon={true}
                        // showClear={true}
                        />
                        <div style={{ width: "200px" }}></div>
                    </div>
                </div>
                <SortInput />
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
                                    <CgProfile />
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
