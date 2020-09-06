import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import style from './style';

function RadioButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onSelect}
      style={[style.mainContainer, props.containerStyle]}>
      <View
        style={[
          style.container,
          props.style,
          props.selected && style.selectedContainer,
        ]}>
        {props.selected ? <View style={style.selected} /> : null}
      </View>
      <Text style={style.label}>{props.label}</Text>
    </TouchableOpacity>
  );
}

export default RadioButton;
