import React, {useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';

import style from './style';

function Tab(props) {
  function handlePress() {
    props.onPress();
  }

  return (
    <TouchableOpacity
      style={[style.container, props.active && style.tabActive]}
      onPress={handlePress}>
      <Text
        style={[style.tabTextStyle, !props.active && style.tabTextUnselected]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}

export default Tab;
