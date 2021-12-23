import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_REMOVE_ALL_ITEMS
} from "../constants/cartConstants";

//A reducer that is used in teh Redux store
function cartReducer(state = {
  cartItems: [],
  shipping: {},
  payment: {}
}, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find(x => x.id === item.id);
      if (product) {
        return {
          cartItems: state.cartItems.map(x => x.id === product.id ? item : x)
        };
      }
      return {
        cartItems: [...state.cartItems, item]
      };
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter(x => x.id !== action.payload)
      };
    case CART_REMOVE_ALL_ITEMS:
      return {
        cartItems: state.cartItems = []
      };
    default:
      return state
  }
}

export {
  cartReducer
}