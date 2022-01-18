import { Link } from 'react-router-dom'
import { BsFillXCircleFill} from "react-icons/bs";
function Store(){
    return (
        <div>
            <div><Link to= '/'><BsFillXCircleFill/></Link></div>
            <div><h1>Store</h1></div>
        </div>

    )
}
export default Store;