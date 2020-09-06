export const SET_CART = 'SET_CART';
export const SET_ITEM = 'SET_ITEM';
export const CLEAR_CART = 'CLEAR_CART';
export const SET_CART_RESTAURANT = 'SET_CART_RESTAURANT';

const action = {};

action.setCart = payload => ({type: SET_CART, payload});
action.setItem = payload => ({type: SET_ITEM, payload});
action.clearCart = payload => ({type: CLEAR_CART, payload});
action.setCartRestaurant = payload => ({type: SET_CART_RESTAURANT, payload});

export default action;
