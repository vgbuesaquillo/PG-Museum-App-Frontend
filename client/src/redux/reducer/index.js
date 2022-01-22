import {combineReducers} from 'redux'
import allProductsReducer from './allProductsReducer'
import galleryReducer from './galleryReducer'
import storageReducer from './storageReducer'


const rootReducer = combineReducers({
    allProductsReducer,
    galleryReducer,
    storageReducer
})

export default rootReducer