import { Link } from 'react-router-dom'
import { BsFillXCircleFill} from "react-icons/bs";
function Favorite(){
    return (
        <div>
            <div><Link to= '/'><BsFillXCircleFill/></Link></div>
            <div><h1>Favorite</h1></div>
        </div>

    )
}
export default Favorite;