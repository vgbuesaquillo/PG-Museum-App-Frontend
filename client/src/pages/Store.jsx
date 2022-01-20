import { Link } from 'react-router-dom'
import StoreCard from './StoreCard';
import './styles/Store.css'
import React, { useEffect, useState} from 'react'
//import { BsFillXCircleFill} from "react-icons/bs";

function Store(){

    const [products, setProducts] = useState()
    useEffect(() => {

        const allStorage = () => {
    
            var values = [],
                keys = Object.keys(localStorage),
                i = keys.length;
        
            while ( i-- ) {
                values.push( JSON.parse(localStorage.getItem(keys[i])));
            }
        
            setProducts(values.filter(el => Array.isArray(el) != true));
        }
        allStorage()

    },[])

    return (
        <div className="container_cards">
           <div className = 'top_cards'>
                <div><h1>My Card/{products?.length} items</h1></div>
                <div className = 'top_Link'><Link to= '/'><b>Buy all</b> </Link></div>
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