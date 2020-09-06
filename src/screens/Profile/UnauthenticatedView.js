import React from 'react';
import {View} from 'react-native';
import {withNavigation} from 'react-navigation';

import GeneralStyle from '../GeneralStyle';
import style from './style';
import List from './List';

function UnauthenticatedView(props) {
  return (
    <View style={[GeneralStyle.container, style.container]}>
      <List
        onPress={() => props.navigation.navigate('Login')}
        label="Login"
      />
      <List
        onPress={() => props.navigation.navigate('Register')}
        label="Register"
      />
    </View>
  );
}

export default withNavigation(UnauthenticatedView);
