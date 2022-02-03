import {combineReducers} from 'redux'
import allProductsReducer from './allProductsReducer'
import galleryReducer from './galleryReducer'
import storageReducer from './storageReducer'
import adminProductsReducer from './adminProductsReducer'
import orderReducer from './orderReducer'


const rootReducer = combineReducers({
    allProductsReducer,
    galleryReducer,
    storageReducer,
    adminProductsReducer,
    orderReducer

})

export default rootReducer