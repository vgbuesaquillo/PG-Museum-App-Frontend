import { GET_ORDER, GET_ORDER_ID, PUT_ORDER, FILTER_ORDER, POST_NEW_ORDER, GET_PAY } from '../types/index'

const initialState = {
  allOrder: [],
  filterOrder:[],
  putOrder:[],
  filterState:[],
  pay:[]
}

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
        console.log("action", action.payload)
        return {
            ...state,
            allOrder: action.payload
        }

    case GET_ORDER_ID:
        console.log("action", action.payload)
        return {
            ...state,
            filterOrder: action.payload
        }

    case PUT_ORDER:
    console.log("action_order", action.payload)
    return {
        ...state,
        putOrder: action.payload
    }

    case FILTER_ORDER:
    console.log("action_order", action.payload)
    return {
        ...state,
        filterState: action.payload
    }

    case POST_NEW_ORDER:
    console.log("action_order", action.payload)
    return {
        ...state,
        
    }

    case GET_PAY:
    console.log("action_order", action.payload)
    return {
        ...state,
        pay: action.payload
    }


    default:return state;
 }
}