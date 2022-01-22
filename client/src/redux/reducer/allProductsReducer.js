import { POST_PRODUCTS, TOTAL_PRODUCT } from '../types'

const initialState = {
  allproducts: [],
  totalCount:0
}

export default function allProductsReducer(state = initialState, action) {
  switch (action.type) {
    case POST_PRODUCTS:
      return {
        ...state,
        allproducts: action.payload
      }
    case TOTAL_PRODUCT:
      let count = 0
      state.allproducts.map(element => {
        count += element.price
      })
      return {
        ...state,
        totalCount: count
      }
    default:
      return state
  }
}