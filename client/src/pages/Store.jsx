import { Link } from 'react-router-dom'
import StoreCard from './StoreCard';
import './styles/Store.css'
import {useSelector} from 'react-redux'
// import React, { useEffect, useState} from 'react'
// import {postProducts} from '../redux/actions'

//import { BsFillXCircleFill} from "react-icons/bs";

function Store(){

    const products = useSelector(state => state.allproducts)
    // const dispatch = useDispatch()


    // useEffect(() => {

        

    // },[dispatch])

    return (
        <div className="container_cards">
           <div className = 'top_cards'>
                <div><h1>My Card/{products?.length} items</h1></div>
                {/* <div className = 'top_Link'><Link to= '/'><b>Buy all</b> </Link></div> */}
            </div> 
            <div>
                {
                    products?.map((a) => {
                        return <StoreCard key ={a.id} title={a.title} url={a.images} pricing={a.price}/>
                    })
                }
            </div>
        </div>

    )
}
export default Store;