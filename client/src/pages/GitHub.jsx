import { Link } from 'react-router-dom'
import { BsFillXCircleFill} from "react-icons/bs";
function GitHub(){
    return (
        <div>
            <div><Link to= '/'><BsFillXCircleFill/></Link></div>
            <div><h1>GitHub</h1></div>
        </div>

    )
}
export default GitHub;