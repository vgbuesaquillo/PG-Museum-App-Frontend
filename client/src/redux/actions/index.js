export const GET_ALL_GALLERY = 'ALL_GALLERY'


export const getAllGallery = () => {
    return async function dispatch(dispatch){
        const response = await fetch('http://localhost:5040/home');
        const json = await response.json();
        dispatch({
            type: GET_ALL_GALLERY,
            payload: json
        });
    }
}