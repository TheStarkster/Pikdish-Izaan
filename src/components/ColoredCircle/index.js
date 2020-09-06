import React from 'react';
import {Image} from 'react-native';

import style from './style';

const ColoredCircle = props => {
  let icon = require('../../assets/icon/greenbox.png');

  if (props.color === 'red') {
    icon = require('../../assets/icon/redbox.png');
  }

  return <Image resizeMode="contain" style={[style.icon, props.style]} source={icon} />;
};

ColoredCircle.defaultProps = {
  color: 'green',
};

export default ColoredCircle;
