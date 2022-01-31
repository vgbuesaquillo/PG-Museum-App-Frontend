import { GET_ALL_GALLERY, GET_FIND_GALLERY, CATEGORIES, SORT_GALLERY } from '../types'
const url = process.env.REACT_APP_URL

//fetches the list of artworks - recibe la lista de piezas de arte
export const getAllGallery = (id) => {
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

//manda allGallery ordenado al reducer para actualizar el store
export function sortGallery(sortedGallery) {
    return {
        type: SORT_GALLERY,
        payload: sortedGallery
    }
}