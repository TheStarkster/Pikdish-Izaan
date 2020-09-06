import React from 'react';
import {TouchableOpacity, Image, View, Text, StyleSheet} from 'react-native';
import Ripple from 'react-native-material-ripple';

import constants from '../../config/constants';
import colors from '../../config/colors';

const PaymentButton = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={style.container}>
      <View style={style.iconContainer}>
        {!!props.icon && (
          <Image style={[style.icon, props.iconStyles]} source={props.icon} />
        )}
        <Text style={style.iconText}>{props.iconText}</Text>
      </View>
      {props.note && <Text style={style.note}>{props.note}</Text>}
    </View>
  </TouchableOpacity>
);

export default PaymentButton;

const style = StyleSheet.create({
  container: {
    marginVertical: constants.MARGIN_VERTICAL_XSMALL,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: constants.WINDOW_WIDTH * 0.02,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 3,
    height: constants.WINDOW_HEIGHT * 0.12,
    paddingHorizontal: constants.PADDING_SMALL,
    paddingVertical: constants.PADDING_MEDIUM,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: constants.WINDOW_WIDTH * 0.08,
    height: constants.WINDOW_WIDTH * 0.08,
  },
  iconText: {
    marginLeft: constants.MARGIN_SMALL,
    fontSize: constants.FONT_SMALL * 1.2,
    fontFamily: 'Nunito-Regular',
  },
  note: {
    color: colors.GREY,
    fontSize: constants.FONT_X_SMALL * 0.9,
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
  },
});
