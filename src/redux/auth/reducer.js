import {
  SET_LOCATION,
  SET_USER,
  REMOVE_USER,
  SET_USER_RESTAURANT,
  SET_SAVED_LOCATIONS,
} from './action';

const initialState = {
  location: null,
  user: null,
  savedLocations: [],
  restaurant: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION:
      return {...state, location: action.payload};

    case SET_USER:
      return {...state, user: action.payload};

    case REMOVE_USER:
      return {...state, user: null};

    case SET_USER_RESTAURANT:
      return {...state, restaurant: action.payload};

    case SET_SAVED_LOCATIONS:
      return {...state, savedLocations: action.payload || []};

    default:
      return state;
  }
}
