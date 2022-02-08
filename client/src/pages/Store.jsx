import { Link } from 'react-router-dom'
import StoreCard from './StoreCard';
import 'antd/dist/antd.min.css'
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { postOrder } from '../redux/actions/orderAction'
import './styles/Store.css'


//store component can be used for different lists - el componente store ahora puede usarse para otras listas
function Store({ reducer, property, title, editOptions }) {

  const url = process.env.REACT_APP_URL;
  //reducer store and property comes from props - el store y la propiedad vienen de props
  const products = useSelector(state => state[reducer][property])
  const user = localStorage?.session ? JSON.parse(localStorage.session) : null
  const total = useSelector(state => state.allProductsReducer.totalCount)
  const dispatch = useDispatch();
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
        .then((data) => console.log(" data", data))
    }

    dispatch(postOrder(arr2, total, user[0].id, obras, img))
  }
 

    return (
      <div className="container_cards">
      <div className='top_cards'>
        <div><h1>{title} - {products?.length} Items</h1></div>
        <Link to="/checkoutForm"><Button onClick={handleAddShop}>Buy all</Button></Link>
      </div>
      <div>
        {
          products?.map((a) => {
            return <StoreCard key={a.id} editOptions={editOptions} info={a} />
          })
        }
      </div>
     <div className='detail__content--footer'>
            {/* <MercadoPagoForm products={products} /> */}
            {!editOptions ? <Link to="/mercadoPagoForm"
              state={{ products: products }}
            >Mercado pago</Link> : null}
      </div>
    </div>
  )
}
export default Store;
