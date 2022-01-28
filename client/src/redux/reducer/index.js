import { combineReducers } from 'redux'
import allProductsReducer from './allProductsReducer'
import galleryReducer from './galleryReducer'
import storageReducer from './storageReducer'
import userReducer from './userReducer'


const rootReducer = combineReducers({
    allProductsReducer,
    galleryReducer,
    storageReducer,
    userReducer
})

export default rootReducer