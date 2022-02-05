import { POST_NEW_ARTWORK, GET_ARTWORK, GET_ARTWORK_SUCCESS, PUT_ARTWORK } from "../types";

const initialState = {
  fetchedArtwork: {},
  sendArtwork: {},
  getArtworkById: 0,
  loading: false
}

export default function adminProductsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTWORK:
      return {
        ...state,
        loading: action.payload.loading
      }
    case GET_ARTWORK_SUCCESS:
      return {
        ...state,
        loading: action.payload.loading,
        fetchedArtwork: action.payload.json
      }
    case POST_NEW_ARTWORK:

      return {
        ...state, 
        sendArtwork: action.payload
      }
    default:
      return state
  }
}