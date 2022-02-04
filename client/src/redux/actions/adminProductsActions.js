import axios from 'axios'
import { POST_NEW_ARTWORK, GET_ARTWORK,GET_ARTWORK_SUCCESS, PUT_ARTWORK } from "../types";
const url = process.env.REACT_APP_URL

export const getArtwork = (id) => {
  return async function (dispatch) {

    dispatch({
      type: GET_ARTWORK,
      payload: {
        loading: true
      }
    })
    //console.log(json)
    try {
      const response = await fetch(`${url}/artwork/${id}`)
      const json = await response.json()

      dispatch({
        type:GET_ARTWORK_SUCCESS,
        payload:{
          loading:false,
          json
        }
      })
    } catch (error) {
      console.log(error)
    }

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