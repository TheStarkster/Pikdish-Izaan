export const SET_RESTAURANT = 'SET_RESTAURANT';

const action = {};

action.setRestaurant = payload => ({
  type: SET_RESTAURANT,
  payload,
});

export default action;
