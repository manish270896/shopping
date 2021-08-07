import { combineReducers } from 'redux';
import { productReducer, selectedproductReducer } from './productReducer';

const reducers = combineReducers({
    allProducts: productReducer,
    product: selectedproductReducer,
});

export default reducers;