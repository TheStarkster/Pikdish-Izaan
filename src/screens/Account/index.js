import React, {Component} from 'react';
import {View} from 'react-native';

import Header from '../../components/Header';
import GeneralStyle from '../GeneralStyle';

class Account extends Component {
  render() {
    return (
      <View style={GeneralStyle.flex1}>
        <Header>Account</Header>
      </View>
    );
  }
}

export default Account;
