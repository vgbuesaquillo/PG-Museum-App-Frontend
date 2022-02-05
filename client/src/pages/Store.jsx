import { Link } from 'react-router-dom'
import StoreCard from './StoreCard';
import MercadoPagoForm from "../components/MercadoPagoForm";
import EmailSending from "../components/EmailSending";
import './styles/Store.css'
import { useSelector } from 'react-redux'

//store component can be used for different lists - el componente store ahora puede usarse para otras listas
function Store({ reducer, property, title, editOptions }) {

  //reducer store and property comes from props - el store y la propiedad vienen de props
  const products = useSelector(state => state[reducer][property])

  return (
    <div className="container_cards">
      <div className='top_cards'>
        <div><h1>{title} - {products?.length} Items</h1></div>
        {/* <div className = 'top_Link'><Link to= '/'><b>Buy all</b> </Link></div> */}
      </div>
      <div>
        {
          products?.map((a) => {
            return <StoreCard key={a.id} title={a.title} url={a.images} pricing={a.price} id={a.id} editOptions={editOptions} />
          })
        }
      </div>
      <div className='sendEmail__content--footer'>
        <EmailSending/>
      </div>
      <div className='passPago__content--footer'>
        <MercadoPagoForm products={products}/>
      </div>
    </div>

  )
}
export default Store;