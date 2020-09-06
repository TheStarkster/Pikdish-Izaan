import React, {Component} from 'react';
import {View} from 'react-native';

import Header from '../../components/Header';
import GeneralStyle from '../GeneralStyle';

class Explore extends Component {
  render() {
    return (
      <View style={GeneralStyle.flex1}>
        <Header>Explore</Header>
      </View>
    );
  }
}

export default Explore;
