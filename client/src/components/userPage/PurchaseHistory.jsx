import { useEffect, useState } from "react";



const PurchaseHistory = () => {
  const url = process.env.REACT_APP_URL
  
  const [purchaseHistory, setPurchaseHistory] = useState([])

  useEffect(()=>{
    const fetchPurchaseHistory= async()=>{
      const data = await fetch(`${url}/shopping/all`)
      const json = await data.json()

      setPurchaseHistory([...purchaseHistory, json])
    }
    fetchPurchaseHistory()
  }, [])

  return ( 
    <div className="container">
      <h2>Historial de Compras</h2>
    </div>
   );
}
 
export default PurchaseHistory;