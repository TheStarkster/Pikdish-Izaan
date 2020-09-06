export const SET_SELECTED_TABLE = 'SET_SELECTED_TABLE';
export const SET_SELECTED_DEPARTMENT = 'SET_SELECTED_DEPARTMENT';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';

const action = {};

action.setSelectedTable = payload => ({type: SET_SELECTED_TABLE, payload});
action.setSelectedDepartment = payload => ({
  type: SET_SELECTED_DEPARTMENT,
  payload,
});
action.setSelectedCategory = payload => ({
  type: SET_SELECTED_CATEGORY,
  payload,
});

export default action;
