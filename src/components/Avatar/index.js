import React from 'react';
import {ImageBackground} from 'react-native';

import style from './style';

const Avatar = props => (
  <ImageBackground
    style={[style.image, props.style]}
    imageStyle={style.innerImage}
    source={props.source}></ImageBackground>
);

Avatar.defaultProps = {
  source: require('../../assets/images/avatar.jpg'),
};

export default Avatar;
