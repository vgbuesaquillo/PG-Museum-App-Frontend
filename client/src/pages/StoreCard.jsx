import './styles/StoreCard.css'
import { BiChevronLeftCircle } from "react-icons/bi";
import { BiChevronRightCircle } from "react-icons/bi";


function StoreCard({prop}){
    
    return(

        <div className="card">
            <div>
                <img 
                    height={205} 
                    src={prop.url} 
                    alt={prop.title}
                />
            </div>
            <div className="card_info">
                <div>{prop.title}</div>
                <div>{prop.pricing}</div>
            </div>
            <div className="card_bott">
                <button>Buy</button>
                <button>Delete</button>
                <div><button>< BiChevronLeftCircle/></button>4<button><BiChevronRightCircle/></button></div>
                
            </div>
        </div>
    )
}

export default StoreCard;