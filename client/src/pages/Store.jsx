import { Link } from 'react-router-dom'
import StoreCard from './StoreCard';
import './styles/Store.css'
import {useSelector } from 'react-redux'

function Store(){

    const products = useSelector(state => state.allProductsReducer.allproducts)

    return (
        <div className="container_cards">
           <div className = 'top_cards'>
                <div><h1>My Card/{products?.length} items</h1></div>
                {/* <div className = 'top_Link'><Link to= '/'><b>Buy all</b> </Link></div> */}
            </div> 
            <div>
                {
                    products?.map((a) => {
                        return <StoreCard key ={a.id} title={a.title} url={a.images} pricing={a.price} id={a.id}/>
                    })
                }
            </div>
        </div>

    )
}
export default Store;