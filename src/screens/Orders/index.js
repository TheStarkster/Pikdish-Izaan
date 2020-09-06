import React, {Component} from 'react';
import {View} from 'react-native';

import Header from '../../components/Header';
import GeneralStyle from '../GeneralStyle';

class Orders extends Component {
  render() {
    return (
      <View style={GeneralStyle.flex1}>
        <Header>Orders</Header>
      </View>
    );
  }
}

export default Orders;
