import { Link } from 'react-router-dom'
import { BsFillXCircleFill} from "react-icons/bs";
function Notification(){
    return (
        <div>
            <div><Link to= '/'><BsFillXCircleFill/></Link></div>
            <div><h1>Notification</h1></div>
        </div>

    )
}
export default Notification;