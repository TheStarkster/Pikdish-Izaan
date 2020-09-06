import {
  SET_SELECTED_TABLE,
  SET_SELECTED_DEPARTMENT,
  SET_SELECTED_CATEGORY,
} from './action';

const initialState = {
  selectedTable: null,
  selectedDepartment: null,
  selectedCategory: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_TABLE:
      return {...state, selectedTable: action.payload};
    case SET_SELECTED_DEPARTMENT:
      return {...state, selectedDepartment: action.payload};

    case SET_SELECTED_CATEGORY:
      return {...state, selectedCategory: action.payload};

    default:
      return state;
  }
}
