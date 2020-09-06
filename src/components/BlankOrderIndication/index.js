import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';

import style from './style';

function BlankOrderIndication(props) {
  return (
    <View style={style.container}>
      <Image resizeMode="contain" style={style.icon} source={props.icon} />
      <TouchableOpacity onPress={props.onPress}>
        <Text style={style.message}>Let's order</Text>
      </TouchableOpacity>
    </View>
  );
}

BlankOrderIndication.defaultProps = {
  onPress: function() {},
};

export default BlankOrderIndication;
