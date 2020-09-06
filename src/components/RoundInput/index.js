import React from 'react';
import {View} from "react-native";
import {Item, Input, Icon} from 'native-base';

import style from './style';

export default function(props) {
  return (
    <View style={style.searchBarContainer}>
      <Item style={style.borderBottomZero}>
        <Icon name="ios-search" />
        <Input placeholder={props.placeholder} />
      </Item>
    </View>
  );
}
