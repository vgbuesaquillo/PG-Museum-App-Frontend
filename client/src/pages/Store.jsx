import { NavLink } from 'react-router-dom'
import StoreCard from './StoreCard';
import EmailSending from "../components/EmailSending";
import { useDispatch, useSelector } from 'react-redux'
import { postOrder } from '../redux/actions/orderAction'
import './styles/Store.css'


//store component can be used for different lists - el componente store ahora puede usarse para otras listas
function Store({ reducer, property, title, editOptions }) {

  //reducer store and property comes from props - el store y la propiedad vienen de props
  const products = useSelector(state => state[reducer][property])
  const user = localStorage?.session ? JSON.parse(localStorage.session) : null
  const total = useSelector(state => state.allProductsReducer.totalCount)
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
    dispatch(postOrder(arr2, total, user[0].id, obras, img))
  }
    let hoy = new Date();
    hoy = hoy.toTimeString()
    const obras = products.map((a) => Number(a.id));
    const img = []
    products.map((a) => img.push(a.images)); 
    let arr2 = []
    arr2.push(hoy)
    console.log("obras", obras)
    console.log("arr2", arr2)
    console.log("img", img)
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
        {!editOptions? <NavLink to="/mercadoPagoForm">Mercado pago</NavLink>: null}
      </div>
    </div>

  )
}
export default Store;