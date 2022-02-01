import { useEffect, useState } from "react";



const PurchaseHistory = () => {

  const [purchaseHistory, setPurchaseHistory] = useState([])

  useEffect(()=>{
    const fetchPurchaseHistory= async()=>{
      const data = await fetch(`http://localhost:5040/shopping/all`)
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