import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom"
import Cookies from 'universal-cookie'
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useDispatch, useSelector } from 'react-redux'
import { getFindGallery, getAllGallery } from '../redux/actions/galleryActions'
import "./styles/TopBar.css";
import 'antd/dist/antd.css';
import { Button, Avatar } from 'antd';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import {CgProfile} from 'react-icons/cg';
// import SortInput from "./SortInput";

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
        dispatch(getAllGallery())
    }
    console.log(login);

    return (
        <div className="topbar">
            <div className="topbar__content">
                <div className='left--content'>
                    <div className="searchForm">
                        <div style={{ width: 240 }}>
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
                                styling={
                                    {
                                        height: "34px",
                                        border: "none",
                                        borderRadius: "15px",
                                        backgroundColor: "white",
                                        boxShadow: "none",
                                        fontSize: "14px",
                                    }
                                }
                            />
                            <div style={{ width: "200px" }}></div>
                        </div>
                    </div>
                    <div className='cart' style={{ color: total < 500000 ? 'green' : 'red'}}>
                        <div className='cart__content'>
                            <RiShoppingBag3Fill className='cart__icon' />
                            <span>${total}</span>
                        </div>
                    </div>
                </div>
                {/* <SortInput /> */}
                <div className='loginButtons'>
                    {
                        cookies.get('session') ?
                        <NavLink to='/admin'>
                            <div>
                                {/* <label>{login.username}</label> */}
                                { login?.image ? <Avatar src={login?.image} /> : <CgProfile/>}
                            </div> 
                        </NavLink> :
                        <div>
                            <Button type='primary' className='loginButtons__button'>
                                <NavLink to="/Login">Login</NavLink>
                            </Button>
                            <Button type='primary' className='loginButtons__button'>
                                <NavLink to="/signup">Create Account</NavLink>
                            </Button>
                        </div>
                    }
                </div>

            </div>

        </div>
    )
}

export default TopBar
