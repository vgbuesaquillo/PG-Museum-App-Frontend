import logoapp from '../images/logoapp.svg'
import "./styles/OrdenDetail.css"
import { useDispatch, useSelector } from 'react-redux';
import { putOrderId } from '../redux/actions/orderAction'
import { useNavigate } from "react-router-dom";

const user = localStorage.session? JSON.parse(localStorage.session): null
var cebo = []

function  OrdenDetail(){

    const navigate = useNavigate();
    const order = useSelector(state => state.orderReducer.filterOrder);
    const artworkShop = useSelector(state => state.galleryReducer.allGallery);
 
    const dispatch = useDispatch();
   if(user){
        order.map((o) => {
            return o.artworksId.map(id => {
                return artworkShop.find(element => element.id === Number(id)?
                cebo.includes(element.images)?
                null:
                cebo.push(element.images)
                : null
            )})
        })
   }
       
    console.log("order" ,order)
    const handleClick = (e) => {
        e.preventDefault();
        window.location.href = "./";
    }
    const HandleNavigate = (e, {i}) => {
        e.preventDefault();
        navigate(`/${i}`)
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
                <h3>Fecha de pedido:{" " + order.map((o)=> o.createdAt) }</h3>
                
                {
                    cebo? cebo.map((c) => <img src={c} alt="img"/>):null
                }
                
                {
                    user[0].roles[0] === 'ROLE_USER'?
                    order.map((o)=> o.artworksId.map(i => <h3 onClick={(e) => HandleNavigate(e, {i})}>{i}</h3>) ): null
                }

                <div>
                    {
                        user[0].roles[0] === 'ROLE_ADMIN'?
                            <select  name="select" id="" onChange={(e) => handleSelect(e)}>
                                <option value="creada">creada</option>
                                <option value="procesando">procesando</option>
                                <option value="completa">completa</option>
                                <option value="cancelada">cancelada</option>
                            </select>
                            :null
                    }
                    
                    <button onClick={handleClick}>Volver</button>
                </div>
            </div>
        </div>
    )
}

export default OrdenDetail;