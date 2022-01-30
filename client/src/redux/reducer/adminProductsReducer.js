import { POST_NEW_ARTWORK, GET_ARTWORK, PUT_ARTWORK } from "../types";

const initialState = {
  fetchedArtwork:{},
  sendArtwork:{},
  getArtworkById: 0,

}

export default function adminProductsReducer (state=initialState, action){
  switch (action.type) {
    case GET_ARTWORK:
      return{
        ...state,
        fetchedArtwork: action.payload
      }

    case POST_NEW_ARTWORK:
      console.log(action.payload)
      return {
        ...state, 
        sendArtwork: action.payload
      }
    default:
      return state
  }
}