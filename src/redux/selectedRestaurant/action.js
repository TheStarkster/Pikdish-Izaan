export const SET_SELECTED_RESTAURANT = 'SET_SELECTED_RESTAURANT';
export const SET_SELECTED_ORDER_TYPE = 'SET_SELECTED_ORDER_TYPE';
export const SET_SELECTED_ORDER_ITEMS = 'SET_SELECTED_ORDER_ITEMS';

const action = {};

action.setSelectedRestaurant = payload => ({
  type: SET_SELECTED_RESTAURANT,
  payload,
});

action.setSelectedOrderType = payload => ({
  type: SET_SELECTED_ORDER_TYPE,
  payload,
});

action.setSelectedOrderItems = payload => ({
  type: SET_SELECTED_ORDER_ITEMS,
  payload,
});

export default action;
