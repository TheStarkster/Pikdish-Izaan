import {combineReducers} from 'redux';

import auth from './auth/reducer';
import theme from './theme/reducer';
import selectedRestaurant from './selectedRestaurant/reducer';
import cart from './cart/reducer';
import table from './table/reducer';
import restaurant from './restaurant/reducer';

export default combineReducers({
  auth,
  theme,
  selectedRestaurant,
  cart,
  table,
  restaurant,
});
