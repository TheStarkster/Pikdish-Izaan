import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

function CashButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={style.container}>
      <Text style={[style.text, props.active && style.textActive]}>
        ₹ {props.amount}
      </Text>
    </TouchableOpacity>
  );
}

export default CashButton;

const style = StyleSheet.create({
  container: {
    paddingVertical: constants.PADDING_VERTICAL_MEDIUM * 0.5,
    borderColor: colors.GREY,
    borderWidth: 0.5,
    flex: 1,
    marginHorizontal: constants.MARGIN_X_SMALL,
  },
  text: {
    textAlign: 'center',
    fontSize: constants.FONT_SMALL * 0.8,
    fontFamily: 'Nunito-Regular',
  },
  textActive: {
    color: colors.RED,
  },
});
