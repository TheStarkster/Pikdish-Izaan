export const SET_APP_THEME = 'SET_APP_THEME';
export const SET_COUNTRY_DATA = 'SET_COUNTRY_DATA';
export const SET_CUISINE = 'SET_CUISINE';

const action = {};

action.setAppTheme = payload => ({type: SET_APP_THEME, payload});
action.setCountryData = payload => ({type: SET_COUNTRY_DATA, payload});
action.setCuisine = payload => ({type: SET_CUISINE, payload});

export default action;
