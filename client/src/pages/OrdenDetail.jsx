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
    console.log("user", user)
    console.log("order" ,order) 
 
    const dispatch = useDispatch();
    // let respuesta 

    useEffect(() => {
        
        dispatch(getPay(user[0].id))

    },[getPay])

    const imgId = order.map((o)=> o.artworksId.map(i => i.toString()) )
    console.log("imgId", imgId)
    const p = pay.filter((pay) => pay.products[0].includes(imgId))
    const pDos = pay.filter((pay) => pay.products.toString() === imgId.toString())
    const pArr = pay.map((pay) => pay.products)
    const pagoArr = pArr.filter(i => i.toString() === imgId.toString())
    console.log("p ", p)
    console.log("p de map", p.map((p) => p.state))
    console.log("que es",  p.map((p) => p.state === "approved"))
    console.log("pagoArr ", pagoArr)
    console.log("pDos ", pDos)

    let bandera = false
    const base = p.map((p) => p.state)
    const baseDos = pDos.map((p) => p.state)
   if(user){
       console.log("base", base[0] === "approved")
       console.log("baseDos", baseDos[0] === "approved")
        order.map((o) => {
            return o.artworksId.map(id => {
                return artworkShop.find(element => element.id === Number(id)?
                cebo.includes(element.images)?
                null:
                cebo.push(element.images)
                : null
                )})
            })
    
        
        //    if(user && pay){
            //         order.map((o) => {
                //             return o.artworksId.map(id => {
                    //                 return pay.products.map((a)=> a.includes(id) ) ?
                    //                 console.log("o", o): console.log("no entro")
                    //             })
                    //         })
                    //    }
    if(base[0] === "approved" || baseDos[0] === "approved") {
        console.log("p ap", p.map((p) => p.state))
        const arr = []
        const uno = p.map((p) => p.products)
        const unoo = pDos.map((p) => p.products)
        
        const r = uno?.toString().split(" ", 1)
        const rDos = unoo?.toString().split(" ", 1)
        console.log("uno", uno)
        console.log("unoo", unoo)
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
        console.log("rDos" ,rDos)
        if (arr && arr.includes(r?r[0]: r)) {
            dispatch(putOrderId((order.map((o)=> o.id) ),( "procesando")));
            bandera = true;
            console.log("include")
        }
        if (unoo) {
            dispatch(putOrderId((order.map((o)=> o.id) ),( "procesando")));
            bandera = true;
            console.log("include")
        }
    }
    if(base[0] === "in_process"  || baseDos[0] === "in_process"){
        console.log("p in", p.map((p) => p.state))
        dispatch(putOrderId((order.map((o)=> o.id) ),( "creada")));
        console.log("entra aqui")
    }

    if(base[0] === "rejected" || baseDos[0] ===  "rejected"){
        console.log("p re", p.map((p) => p.state))
        const arr = []
        const uno = p.map((p) => p.products)
        const unoo = pDos.map((p) => p.products)
        const r = uno?.toString().split(" ", 1)
        const rDos = unoo?.toString().split(" ", 1)
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
        console.log("r re" ,r)
        if (arr && arr.includes(r?r[0]: r)) {
            dispatch(putOrderId((order.map((o)=> o.id) ),( "cancelada")));

            fetch(
                `${url}/artwork/put/${uno[0]}`,
                {
                  // entry point backend
                  method: "PUT",
                  body: JSON.stringify({
                    stock: true
                  }),
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Request-Method":
                    "GET, POST, DELETE, PUT, OPTIONS",
                    "Content-Type": "application/json",
                  },
                }
              )
                .then((res) => res.json())
                .then((data) => console.log(" data", data))

            bandera = false;
            console.log("include")
        
        }
        if (unoo) {
            dispatch(putOrderId((order.map((o)=> o.id) ),( "cancelada")));
            for (let i = 0; i < unoo.length; i++) {
                fetch(
                    `${url}/artwork/put/${unoo[i]}`,
                    {
                      // entry point backend
                      method: "PUT",
                      body: JSON.stringify({
                        stock: true
                      }),
                      headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Request-Method":
                        "GET, POST, DELETE, PUT, OPTIONS",
                        "Content-Type": "application/json",
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => console.log(" data", data))
                
            }
            bandera = false;
            console.log("include")
        }

    }
    if(base[0] === "Invalid card information" || baseDos[0] === "Invalid card information" ){
        console.log("p inv", p.map((p) => p.state))
        const arr = []
        const uno = p.map((p) => p.products)
        const unoo = pDos.map((p) => p.products)
        const r = uno?.toString().split(" ", 1)
        const rDos = unoo?.toString().split(" ", 1)
        const dos = order.map((d)=>{
            return d.artworksId.map(i => {
                arr.push(i.toString())
            })
        })
        if (arr && arr.includes(r?r[0]: r)) {
            dispatch(putOrderId((order.map((o)=> o.id) ),( "cancelada")));

            fetch(
                `${url}/artwork/put/${uno[0]}`,
                {
                  // entry point backend
                  method: "PUT",
                  body: JSON.stringify({
                    stock: true
                  }),
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Request-Method":
                      "GET, POST, DELETE, PUT, OPTIONS",
                    "Content-Type": "application/json",
                  },
                }
              )
                .then((res) => res.json())
                .then((data) => console.log(" data", data))

            bandera = true;
            console.log("include")
        
        }
        if (unoo) {
            dispatch(putOrderId((order.map((o)=> o.id) ),( "cancelada")));
            for (let i = 0; i < unoo.length; i++) {
                fetch(
                    `${url}/artwork/put/${unoo[i]}`,
                    {
                      // entry point backend
                      method: "PUT",
                      body: JSON.stringify({
                        stock: true
                      }),
                      headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Request-Method":
                        "GET, POST, DELETE, PUT, OPTIONS",
                        "Content-Type": "application/json",
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => console.log(" data", data))
                
            }
            bandera = false;
            console.log("include")
        }
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
                   p.length>0? <h3>Metodo de pago: {" " + ( p.map((o)=> o.state )=== "approved" || p.map((o)=> o.state )=== "in_process" )? p.map((o)=> o.payment_type_id): null }</h3>: <h3>Ningun metodo de pago</h3>
                }
                {/* <h3>Credit_card{" " + order.map((o)=> o.credit_card) }</h3> */}
                <h3>Total{" " + order.map((o)=> o.total) }</h3>
                <h3>Fecha de pedido:{" " + order.map((o)=> o.createdAt) }</h3>
                {
                
                  (base[0] === "approved" ) ?  <h3>Fecha de pago: {" " +  p.map((o)=> o.createdAt)  }</h3>: <h3>No hay pago</h3> 
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