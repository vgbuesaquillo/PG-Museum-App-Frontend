import axios from 'axios'
import { POST_NEW_ARTWORK, GET_ARTWORK, PUT_ARTWORK } from "../types";
const url = process.env.REACT_APP_URL

export const getArtwork = (id) => {
  return async function (dispatch) {
    const response = await fetch(`${url}/artwork/${id}`)
    const json = await response.json()
    //console.log(json)
    dispatch({
      type: GET_ARTWORK,
      payload: json
    })
  }
}

export const postNewArtwork = (info) => {
  return async function (dispatch) {
    console.log(info)
    
    const response = await axios.post(`${url}/artwork/post`, info)

    console.log(response)
    dispatch({
      type: POST_NEW_ARTWORK,
      payload: response.data
    })
  }
}