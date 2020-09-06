import {
  SET_SELECTED_RESTAURANT,
  SET_SELECTED_ORDER_TYPE,
  SET_SELECTED_ORDER_ITEMS,
} from './action';

const initialState = {
  restaurant: null,
  orderType: null,
  items: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_RESTAURANT:
      return {...state, restaurant: action.payload};

    case SET_SELECTED_ORDER_TYPE:
      return {...state, orderType: action.payload};

    case SET_SELECTED_ORDER_ITEMS:
      return {...state, items: action.payload};

    default:
      return state;
  }
}
