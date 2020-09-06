import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import colors from '../../../config/colors';
import constants from '../../../config/constants';

function GraphHeading(props) {
  return (
    <View>
      <Text style={style.text}>{props.children}</Text>
    </View>
  );
}

export default GraphHeading;

const style = StyleSheet.create({
  text: {
    fontFamily: 'Nunito-Regular',
    color: colors.DARK_GREY,
    borderColor: colors.DARK_GREY,
    paddingBottom: 5,
    borderBottomWidth: 0.5,
    fontSize: constants.FONT_SMALL,
  },
});
