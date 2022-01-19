import {GET_ALL_GALLERY, GET_FIND_GALLERY} from '../actions/index.js' 

const initialState = {
    allGallery: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_GALLERY: 
            return {
                ...state,
                allGallery: action.payload
            }
        case GET_FIND_GALLERY: 
        return {
            ...state,
            allGallery: action.payload
        }
        default:
            return state;
    }
}