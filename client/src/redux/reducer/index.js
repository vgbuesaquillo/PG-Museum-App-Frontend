import {combineReducers} from 'redux'
import allProductsReducer from './allProductsReducer'
import galleryReducer from './galleryReducer'
import storageReducer from './storageReducer'
import adminProductsReducer from './adminProductsReducer'


const rootReducer = combineReducers({
    allProductsReducer,
    galleryReducer,
    storageReducer,
    adminProductsReducer
})

export default rootReducer