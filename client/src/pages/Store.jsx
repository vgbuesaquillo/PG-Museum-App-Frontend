import { NavLink } from 'react-router-dom'
import StoreCard from './StoreCard';
import EmailSending from "../components/EmailSending";
import { useDispatch, useSelector } from 'react-redux'
import { postOrder } from '../redux/actions/orderAction'
import './styles/Store.css'
import MercadoPagoForm from '../components/MercadoPagoForm';


//store component can be used for different lists - el componente store ahora puede usarse para otras listas
function Store({ reducer, property, title, editOptions }) {
  const url = process.env.REACT_APP_URL;
  //reducer store and property comes from props - el store y la propiedad vienen de props
  const products = useSelector(state => state[reducer][property])
  const user = localStorage?.session ? JSON.parse(localStorage.session) : null
  const total = useSelector(state => state.allProductsReducer.totalCount)
  const filterId = useSelector(state => state.galleryReducer.filterId);
  const dispatch = useDispatch();
  
  console.log("products", products)
  console.log("total", total)
  

  const handleAddShop = () => {
    let hoy = new Date();
    const obras = products.map((a) => a.id);
    const img = []
    products.map((a) => img.push(a.images)); 
    let arr2 = []
    arr2.push(hoy)
    for (let i = 0; i < products.length; i++) {
      fetch(
          `${url}/artwork/put/${products[i].id}`,
          {
              // entry point backend
              method: "PUT",
              body: JSON.stringify({
                    stock: false
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
          .then((data) => console.log(" data" ,data))
    }
    
//       products.map( async(a) => {
//       await fetch(
//       `${url}/artwork/put/:${a.id}`,
//       {
//           // entry point backend
//           method: "PUT",
//           body: JSON.stringify({
//             stock: false
//           }),
//           headers: {
//               "Access-Control-Allow-Origin": "*",
//               "Content-Type": "application/json",
//           },
//       }
//   )
// })
    dispatch(postOrder(arr2, total, user[0].id, obras, img))
  }
    // let hoy = new Date();
    // hoy = hoy.toTimeString()
    // const obras = products.map((a) => Number(a.id));
    // const img = []
    // products.map((a) => img.push(a.images)); 
    // let arr2 = []
    // arr2.push(hoy)
    // console.log("obras", obras)
    // console.log("arr2", arr2)
    // console.log("img", img)
    // console.log()

  return (
    <div className="container_cards">
      <div className='top_cards'>


        <div><h1>{title} - {products?.length} Items</h1></div>
        <button className = 'top_Link' onClick={handleAddShop}><b>Buy all</b></button>
        {/* <div className = 'top_Link' onClick={handleAddShop}><b>Buy all</b></div> */}
      </div>
      <div>
        {
          
          products?.map((a) => {
            return <StoreCard key={a.id} editOptions={editOptions} info={a} />
          })
          
        }
      </div>

      <div className='sendEmail__content--footer'>
        <EmailSending/>
      </div>
 
      <div className='checkoutForm'>
        <NavLink to="/checkoutForm">Buy</NavLink>
      </div>
      <div className='detail__content--footer'>
        <MercadoPagoForm products={products} />
        {/* {!editOptions? <NavLink to="/mercadoPagoForm">Mercado pago</NavLink>: null} */}
      </div>
    </div>

  )
}
export default Store;