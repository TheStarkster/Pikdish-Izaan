import React from 'react';
import {Image, Text} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import TabBar from '../components/TabBar';
import Colors from '../config/colors';
import constants from '../config/constants';
import Home from './HomeStack';
import Orders from '../screens/Orders';
import RunningOrders from '../screens/RunningOrders';
import Explore from '../screens/Explore';
import Profile from '../screens/Profile';
import SearchItems from '../screens/SearchItems';

const options = {
  tabBarComponent: ({navigation}) => <TabBar navigation={navigation} />,
};

const Tabs = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: navigationOptions(
        require('../assets/icon/home.png'),
        require('../assets/icon/home-active.png'),
        'Home',
      ),
    },
    Orders: {
      screen: RunningOrders,
      navigationOptions: navigationOptions(
        require('../assets/icon/orders.png'),
        require('../assets/icon/orders-active.png'),
        'Orders',
      ),
    },
    Explore: {
      screen: SearchItems,
      navigationOptions: navigationOptions(
        require('../assets/icon/explore.png'),
        require('../assets/icon/explore-active.png'),
        'Explore',
      ),
    },
    Account: {
      screen: Profile,
      navigationOptions: navigationOptions(
        require('../assets/icon/account.png'),
        require('../assets/icon/account-active.png'),
        'Account',
      ),
    },
  },
  options,
);

export default Tabs;

function navigationOptions(icon, activeIcon, label) {
  return {
    tabBarIcon: ({focused}) => {
      let iconName = icon;

      if (focused) {
        iconName = activeIcon;
      }

      return (
        <Image
          source={iconName}
          resizeMode="contain"
          style={{
            width: constants.TAB_ICON_WIDTH,
            height: constants.TAB_ICON_HEIGHT,
          }}
        />
      );
    },
    tabBarLabel: ({focused}) => {
      let color = 'black';

      if (focused) {
        color = Colors.RED;
      }

      return (
        <Text
          allowFontScaling={false}
          style={{
            color,
            fontSize: 12,
            textAlign: 'center',
            fontFamily: 'Nunito-Regular',
          }}>
          {label}
        </Text>
      );
    },
    tabBarOptions: {
      labelStyle: {color: 'black'},
    },
  };
}
