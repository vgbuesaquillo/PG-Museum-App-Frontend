import {combineReducers} from 'redux'
import allProductsReducer from './allProductsReducer'
import galleryReducer from './galleryReducer'
import storageReducer from './storageReducer'
import sortReducer from './sortReducer'


const rootReducer = combineReducers({
    allProductsReducer,
    galleryReducer,
    storageReducer,
    sortReducer
})

export default rootReducer