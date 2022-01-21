import { GET_ALL_GALLERY, GET_FIND_GALLERY, LOCALSTORAGE, CATEGORIES } from '../actions/index.js'

const initialState = {
    allGallery: [],
    categoryGallery: [],
    storage: []
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
        case LOCALSTORAGE:
            return {
                ...state,
                storage: action.payload
            }
        case CATEGORIES:
            const [data, category] = action.payload
            console.log(action.payload)
            let artworks = data;
            artworks = artworks.filter(art => {
                console.log(art)
                return art.types[0].type.toLowerCase().includes(category.toLowerCase())
            })
            return {
                ...state,
                allGallery: artworks
            }
        default:
            return state;
    }
}

