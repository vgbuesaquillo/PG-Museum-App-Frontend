import logoapp from '../images/logoapp.svg'
import "./styles/OrdenDetail.css"
import { useDispatch, useSelector } from 'react-redux';
import { putOrderId } from '../redux/actions/orderAction'


function  OrdenDetail(){
    const order = useSelector(state => state.orderReducer.filterOrder);
    const dispatch = useDispatch();
    
    const handleClick = (e) => {
        e.preventDefault();
        window.location.href = "./";
    }

    function handleSelect(e) {
		e.preventDefault();
		dispatch(putOrderId((order.map((o)=> o.id) ),( e.target.value)));
	}

    return(
        <div className="contenedor_detail">
            <div className="subContenedor_detail">
                <h3>Pedido N°{" " + order.map((o)=> o.id) }</h3>
                <h3>Estado{" " + order.map((o)=> o.state) }</h3>
                <h3>Credit_card{" " + order.map((o)=> o.credit_card) }</h3>
                <h3>Total{" " + order.map((o)=> o.total) }</h3>
                <h3>Fecha de pedido:{" " + order.map((o)=> o.date) }</h3>
                <img src={logoapp} alt="img" />

                <div>
                    <select  name="select" id="" onChange={(e) => handleSelect(e)}>
                        <option value="creada">creada</option>
                        <option value="procesando">procesando</option>
                        <option value="completa">completa</option>
                        <option value="cancelada">cancelada</option>
                    </select>
                    <button onClick={handleClick}>Volver</button>
                </div>
            </div>
        </div>
    )
}

export default OrdenDetail;