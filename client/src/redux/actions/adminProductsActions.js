import { POST_NEW_ARTWORK, GET_ARTWORK, PUT_ARTWORK } from "../types";

export const getArtwork =(id)=>{
  return async function(dispatch){
    const response = await fetch(`http://localhost:5040/home/${id}`)
    const json = await response.json()
    dispatch({
      type: GET_ARTWORK,
      payload:json
    })
  }
}