import { GET_ALL_GALLERY, GET_FIND_GALLERY, CATEGORIES, SORT_GALLERY, TYPES } from '../types'
import axios from 'axios'
const url = process.env.REACT_APP_URL

//fetches the list of artworks - recibe la lista de piezas de arte
export const getAllGallery = () => {
    return async function dispatch(dispatch) {
        const response = await fetch(`${url}/artwork/all`);
        const json = await response.json();
        dispatch({
            type: GET_ALL_GALLERY,
            payload: json
        });
    }
}

//searches artwork by name - busca pieza de arte por nombre
export const getFindGallery = (input) => {
    return async function dispatch(dispatch) {
        const response = await fetch(`${url}/artwork/name?name=${input}`);
        const json = await response.json();
        dispatch({
            type: GET_FIND_GALLERY,
            payload: json
        });
    }
}

export function categories(category) {
    return async function dispatch(dispatch) {
        const response = await fetch(`${url}/artwork/all`);
        const json = await response.json();
        dispatch({
            type: CATEGORIES,
            payload: [json, category]
        });
    }
}
export function categoriesTypes() {
    return async function dispatch(dispatch) {
        const response = await axios.get(`${url}/types`);
        const json = await response.data;
        dispatch({
            type: TYPES,
            payload: json
        });
    }
}



//manda allGallery ordenado al reducer para actualizar el store
export function sortGallery(sortedGallery) {
    return {
        type: SORT_GALLERY,
        payload: sortedGallery
    }
}