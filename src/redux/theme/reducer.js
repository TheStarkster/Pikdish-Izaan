import {SET_APP_THEME, SET_COUNTRY_DATA, SET_CUISINE} from './action';

const initialState = {
  appTheme: null,
  country: {},
  cuisines: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_APP_THEME:
      return {...state, appTheme: action.payload};

    case SET_COUNTRY_DATA:
      return {...state, country: action.payload};
    case SET_CUISINE:
      return {...state, cuisines: action.payload};
    default:
      return state;
  }
}
