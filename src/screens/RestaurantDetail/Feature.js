import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import constants from '../../config/constants';

const Feature = props => {
  return (
    <View style={[style.container, props.containerStyle]}>
      <Image
        resizeMode="contain"
        style={[style.icon, props.iconStyle]}
        source={{uri: constants.RESTAURANT_LOGO_PATH + props.data.icon_image}}
      />
      <Text style={style.feature}>{props.data.feature_name}</Text>
    </View>
  );
};

export default Feature;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: constants.MARGIN_SMALL,
    flexWrap: 'wrap',
  },
  icon: {
    width: constants.WINDOW_WIDTH * 0.06,
    height: constants.WINDOW_WIDTH * 0.06,
    marginHorizontal: constants.MARGIN_SMALL * 1.2,
  },
  feature: {
    fontFamily: 'Nunito-Light',
    lineHeight: 18,
    fontSize: constants.FONT_SMALL * 0.8,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
