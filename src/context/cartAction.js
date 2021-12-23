import * as paintingApi from '../api/paintings';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_REMOVE_ALL_ITEMS
} from "../constants/cartConstants";

const addToCart = (productId) => async (dispatch, getState) => {
  try {
    const data = await paintingApi.getPaintingById(productId);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        id: data.id,
        name: data.name,
        type: data.type,
        img: data.img,
        price: data.price,
        inCart: true
      }
    });
    const {
      cart: {
        cartItems
      }
    } = getState();
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

  } catch (error) {
    console.log(error);
  }
}
const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId
  });

  const {
    cart: {
      cartItems
    }
  } = getState();
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
const removeAllFromCart = () => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ALL_ITEMS
  });

  const {
    cart: {
      cartItems
    }
  } = getState();
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
export {
  addToCart,
  removeFromCart,
  removeAllFromCart
}