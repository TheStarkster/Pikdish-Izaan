import {createStackNavigator} from 'react-navigation-stack';

import constants from '../config/constants';
import QRCamera from '../screens/QRCamera';
import Home from '../screens/Home/index';
import RestaurantWelcomePage from '../screens/RestaurantWelcomePage';

const options = {
  headerMode: 'none',
};

const HomeStack = createStackNavigator(
  {
    Home,
    QRCamera,
    RestaurantWelcomePage
  },
  options,
);

HomeStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  const routes = navigation.state.routes;
  if (
    routes &&
    routes[routes.length - 1] &&
    constants.TAB_ROUTES_WITH_NO_TAB.includes(
      routes[routes.length - 1].routeName,
    )
  ) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default HomeStack;
