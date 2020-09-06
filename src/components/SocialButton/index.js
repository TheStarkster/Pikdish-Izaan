import React from 'react';
import {Image, Text, View} from 'react-native';
import {Button} from 'native-base';

import style from './style';

const SocialButton = props => (
  <Button style={style.button} bordered dark>
    <Image style={style.icon} resizeMode="cover" source={props.source} />
    <View style={style.textContainer}>
      <Text style={style.text}>{props.children}</Text>
    </View>
  </Button>
);

export default SocialButton;
