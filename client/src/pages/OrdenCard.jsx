import './styles/OrdenCard.css';
import { useNavigate } from "react-router-dom";




function OrdenCard({inicio, pedido, estado, productoId}) {
    const navigate = useNavigate();

    const handleClick = (e)=>{
        e.preventDefault();
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