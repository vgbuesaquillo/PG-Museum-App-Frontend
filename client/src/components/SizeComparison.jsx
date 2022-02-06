import { useState, useEffect } from "react";
import './styles/SizeComparison.css'


const SizeComparison = ({height, width, images}) => {

  const [personSize, setPersonSize] = useState("50")
  const [artworkHeight, setArtworkHeight] = useState("")
  const [artworkWidth, setArtworkWidth] = useState("")

  const calcArtworkSize= height =>{
    const calcArtworkHeight = ((height*50)/180)*100
    const calcArtworkWidth = (40/width).toFixed(2)
    
    console.log("height: ", artworkHeight, "width: ", artworkWidth)
    setArtworkHeight(calcArtworkHeight)
    setArtworkWidth(calcArtworkWidth)
  }
  useEffect(() => {
    calcArtworkSize(height)
  }, []);

  return ( 
    <div className="compare-container" >
      <h2>Size Comparison:</h2>
      <div className="size-comparison">
        <img className="artwork center-absolute" src={images} alt="" style={{height:`${artworkHeight}%`}} />
        <p className="num center-absolute" style={{top:"50px", left:"50%"}} >{width} x {height} mts</p>
        <img className="person" src="/person.png" alt="" style={{height:`${personSize}%`}} />
        <p className="person-height num">1.8 mts</p>
      </div>
    </div>
   );
}
 
export default SizeComparison;