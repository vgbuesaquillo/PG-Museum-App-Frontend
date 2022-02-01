import { POST_PRODUCTS, TOTAL_PRODUCT } from '../types'

// no se, necesito ayuda para saber qué hace ésto, equisde
export function postProducts(val){
    return async function dispatch(dispatch) {
        dispatch({
            type: POST_PRODUCTS,
            payload: val.filter(el => Array.isArray(el) != true )
        })
    }
}

export function totalProduct(){
    return async function dispatch(dispatch) {
        dispatch({
            type: TOTAL_PRODUCT
        })
    }
}