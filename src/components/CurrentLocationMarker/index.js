import React from 'react';
import {Image} from 'react-native';
import {Marker} from 'react-native-maps';

import style from './style';

const CurrentLocationMarker = props => (
  <Marker coordinate={props.location}>
    <Image
      style={style.image}
      resizeMode="contain"
      source={require('../../assets/icon/marker.png')}
    />
  </Marker>
);

export default CurrentLocationMarker;
