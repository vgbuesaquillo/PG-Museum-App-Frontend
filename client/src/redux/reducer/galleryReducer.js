import { GET_ALL_GALLERY, GET_FIND_GALLERY, CATEGORIES } from '../types'

const initialState = {
  allGallery: [] // <-- cada arreglo se va a un store diferente 
}

export default function galleryReducer(state = initialState, action) {
  switch (action.type) {

    case GET_ALL_GALLERY:
      return {
        ...state,
        allGallery: action.payload //<--se mueven al store los case que compartan arreglo en comun
      }

    case GET_FIND_GALLERY:
      return {
        ...state,
        allGallery: action.payload
      }
      
    case CATEGORIES:
      const [data, category] = action.payload
      //console.log(action.payload)
      let artworks = data;
      artworks = artworks.filter(art => {
        // console.log(art)
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