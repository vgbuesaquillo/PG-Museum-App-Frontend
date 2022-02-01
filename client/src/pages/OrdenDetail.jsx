import logoapp from '../images/logoapp.svg'
import "./styles/OrdenDetail.css"
const pedido = {
        fechaOrden: "31/01/2022",
        numeroOden:1000000,
        estado:"creada",
        productoId:6000000
    }

function OrdenDetail(){
    return(
        <div className="contenedor_detail">
            <div className="subContenedor_detail">
                <h3>Pedido N°{" " + pedido.numeroOden }</h3>
                <h3>estado{" " + pedido.estado }</h3>
                <h3>fecha de pedido:{" " + pedido.fechaOrden }</h3>
                <img src={logoapp} alt="img" />
                <div>
                    <select name="" id="">
                        <option value="">creada</option>
                        <option value="">procesando</option>
                        <option value="">completa</option>
                        <option value="">cancelada</option>
                        {/* <option value="">creada</option> */}
                    </select>
                    <button>Actualizar</button>
                </div>
                
            </div>
        </div>
    )
}

export default OrdenDetail;