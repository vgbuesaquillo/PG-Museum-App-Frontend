import './styles/OrdenCard.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getOrderId } from '../redux/actions/orderAction'




function OrdenCard({inicio, pedido, estado, productoId}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (e)=>{
        e.preventDefault();
        dispatch(getOrderId(pedido))
        navigate("/Admin/ordenDetails")
    }

    return(
        <div className="contenedor_orden">
            <div className="subcontenedor_uno">
                <h4>inicio: {inicio}</h4>
                <h4>Pedido {pedido}</h4>
            </div>
            <div className="subcontenedor_dos">
                <h4>{estado}</h4>
                <button onClick={handleClick}>Ver detalle</button>
            </div>

        </div>
    )
}
export default OrdenCard;