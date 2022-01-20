export const GET_ALL_GALLERY = 'GET_ALL_GALLERY'
export const GET_FIND_GALLERY = 'GET_FIND_GALLERY'
export const LOCALSTORAGE = 'LOCALSTORAGE'

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

export function localstorage(storage) {
    return {
        type: LOCALSTORAGE,
        payload: storage
    }
}