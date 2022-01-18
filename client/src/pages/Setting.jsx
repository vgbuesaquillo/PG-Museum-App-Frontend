import { Link } from 'react-router-dom'
import { BsFillXCircleFill} from "react-icons/bs";
function Setting(){
    return (
        <div>
            <div><Link to= '/'><BsFillXCircleFill/></Link></div>
            <div><h1>Setting</h1></div>
        </div>

    )
}
export default Setting;