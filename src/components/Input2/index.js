import React from 'react';
import {View, Text, TextInput} from 'react-native';

import style from './style';

const Input2 = props => (
  <View style={style.container}>
    <Text style={[style.label, props.labelStyles]}>{props.label}</Text>
    <TextInput
      value={props.value}
      onChangeText={props.onChangeText}
      style={style.textInput}
      placeholder={props.placeholder}
    />
  </View>
);

Input2.defaultProps = {
  onChangeText: function() {},
  labelStyles: {}
};

export default Input2;
