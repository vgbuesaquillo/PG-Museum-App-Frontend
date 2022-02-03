import { GET_ORDER, GET_ORDER_ID, PUT_ORDER, FILTER_ORDER } from '../types/index'
import axios from 'axios'
const url = process.env.REACT_APP_URL


export const getAllOrder = () => {
    return async function dispatch(dispatch) {
        const response = await axios.get(`${url}/order`);
        const r = response.data;    
        dispatch({
            type: GET_ORDER,
            payload:r
        });
    }
}

export const getOrderId = (id) => {
    return async function dispatch(dispatch) {
        const response = await axios.get(`${url}/order/${id}`);
        const r = response.data; 
        dispatch({
            type: GET_ORDER_ID,
            payload:r
        });
    }
}

export const putOrderId = (id, state) => {
    return async function dispatch(dispatch) {
        console.log("put" + id)
        console.log("pu" + state)
        const response = await fetch(`${url}/order/put/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                state: state,
            }),
            headers: {
                'content-type': 'application/json',
            },
        })

        const r = response;
        dispatch({
            type: PUT_ORDER,
            payload:r
        });
    }
}

export const filterState = (e) => {
    return async function dispatch(dispatch) {
        const response = await axios.get(`${url}/order`);
        const json = response.data;
        var filtro =json.filter((f)=>f.state === e)
        dispatch({
            type: FILTER_ORDER,
            payload:filtro
        });
    }
}