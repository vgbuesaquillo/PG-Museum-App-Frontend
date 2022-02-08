import logoapp from '../images/logoapp.svg'
import { useEffect } from "react";
import "./styles/OrdenDetail.css"
import { useDispatch, useSelector } from 'react-redux';
import { putOrderId, getPay } from '../redux/actions/orderAction'
import { useNavigate } from "react-router-dom";
const url = process.env.REACT_APP_URL;

const user = localStorage.session? JSON.parse(localStorage.session): null
var cebo = []

function  OrdenDetail(){

    const navigate = useNavigate();
    const pay = useSelector(state => state.orderReducer.pay);
    const order = useSelector(state => state.orderReducer.filterOrder);
    const artworkShop = useSelector(state => state.galleryReducer.allGallery);
    console.log("pay", pay)
 
    const dispatch = useDispatch();
    // let respuesta 
    useEffect(() => {
        
        dispatch(getPay(user[0].id))

    },[])
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
        
        //    if(user && pay){
            //         order.map((o) => {
                //             return o.artworksId.map(id => {
                    //                 return pay.products.map((a)=> a.includes(id) ) ?
                    //                 console.log("o", o): console.log("no entro")
                    //             })
                    //         })
                    //    }
    let bandera = false
    const arr = []
    if(user && pay){
        const uno = pay.products
        const r = uno?.toString().split(" ", 1)
        console.log("uno", uno)
        const dos = order.map((d)=>{  
            return d.artworksId.map(i => {
                arr.push(i.toString())
            })
        })

        console.log("dos", dos) 
        console.log("order" ,order) 
        console.log("user" ,user)
        console.log("cebo" ,cebo)
        console.log("arr" ,arr)
        console.log("r" ,r)
        if (arr && arr.includes(r?r[0]: r)) {
            dispatch(putOrderId((order.map((o)=> o.id) ),( "procesando")));
            bandera = true;
            console.log("include")
        
        }
    }  

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
                {
                    pay?<h3>Metodo de pago {" " + pay&& pay.payment_type_id }</h3>:null
                }
                {/* <h3>Credit_card{" " + order.map((o)=> o.credit_card) }</h3> */}
                <h3>Total{" " + order.map((o)=> o.total) }</h3>
                <h3>Fecha de pedido:{" " + order.map((o)=> o.createdAt) }</h3>
                {
                    pay?<h3>Fecha de pago: {" " + pay?.date_created}</h3>: null
                }
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
                {
                    bandera? <div>Ya se genero el pago de este pedido</div>:null
                }
            </div>
        </div>
    )
}

export default OrdenDetail;