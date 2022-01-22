import { GET_ALL_GALLERY, GET_FIND_GALLERY,CATEGORIES  } from '../types'

//fetches the list of artworks - recibe la lista de piezas de arte
export const getAllGallery = () => {
    return async function dispatch(dispatch) {
        const response = await fetch('http://localhost:5040/home');
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
        const response = await fetch(`http://localhost:5040/home/name?name=${input}`);
        const json = await response.json();
        dispatch({
            type: GET_FIND_GALLERY,
            payload: json
        });
    }
}

export function categories(category) {
    return async function dispatch(dispatch) {
        const response = await fetch('http://localhost:5040/home');
        const json = await response.json();
        dispatch({
            type: CATEGORIES,
            payload: [json, category]
        });
    }
}