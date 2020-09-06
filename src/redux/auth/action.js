export const SET_LOCATION = 'SET_LOCATION';
export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const SET_USER_RESTAURANT = 'SET_USER_RESTAURANT';
export const SET_SAVED_LOCATIONS = 'SET_SAVED_LOCATIONS';

const action = {};

action.setLocation = payload => ({type: SET_LOCATION, payload});
action.setUser = payload => ({type: SET_USER, payload});
action.removeUser = payload => ({type: REMOVE_USER, payload});
action.setUserRestaurant = payload => ({type: SET_USER_RESTAURANT, payload});
action.setSavedLocations = payload => ({type: SET_SAVED_LOCATIONS, payload});

export default action;
