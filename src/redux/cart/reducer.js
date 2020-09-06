import {SET_CART, SET_ITEM, CLEAR_CART, SET_CART_RESTAURANT} from './action';

const initialState = {
  cart: {
    order_items: [],
  },
  restaurant: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return {...state, cart: action.payload};
    case SET_CART_RESTAURANT:
      return {...state, restaurant: action.payload};

    case SET_ITEM:
      return {
        ...state,
        cart: {
          ...state.cart,
          order_items: action.payload,
        },
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: {
          order_items: [],
        },
        restaurant: null,
      };
    default:
      return state;
  }
}
