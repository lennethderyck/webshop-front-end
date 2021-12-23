import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
  userGetUsersReducer,
} from './reducers/userReducers';

const cartItems = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):[];
const userInfo = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):[];
const allUsers = localStorage.getItem('allUsers') ? JSON.parse(localStorage.getItem('allUsers')):[];

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userSignin: { userInfo, },
  users: { allUsers, },
};
const reducer = combineReducers({
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  users: userGetUsersReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
