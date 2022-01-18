import { Link } from 'react-router-dom'
import StoreCard from './StoreCard';
import './styles/Store.css'
//import { BsFillXCircleFill} from "react-icons/bs";

function Store(){
    const card = [{
        id: 1,
        url: "https://openaccess-cdn.clevelandart.org/1922.1133/1922.1133_web.jpg",
        title: "Stag at Sharkey's",
        pricing: "10.000$"
    },{
        id: 2,
        url: "https://openaccess-cdn.clevelandart.org/1922.1133/1922.1133_web.jpg",
        title: "Stag at Sharkey's",
        pricing: "10.000$"
    },{
        id: 3,
        url: "https://openaccess-cdn.clevelandart.org/1922.1133/1922.1133_web.jpg",
        title: "Stag at Sharkey's",
        pricing: "10.000$"
    }]
    return (
        <div className="container">
           <div className = 'top'>
                <div><h1>My Card/{'items'}</h1></div>
                <div><Link to= '/'>Buy all</Link></div>
            </div> 
            <div>
                <p>
                   {
                        card.map((a) => {
                            return <StoreCard key ={a.id} prop={a}/>
                        })
                    } 
                </p>
               
            </div>
        </div>

    )
}
export default Store;