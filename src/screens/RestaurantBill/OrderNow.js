import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';

import constants from '../../config/constants';
import colors from '../../config/colors';

function OrderNow(props) {
  function navigate() {
    props.navigation.navigate('PlaceOrder');
  }

  return (
    <View style={style.container}>
      <View style={[style.button, style.blackButton]}>
        <Text style={style.item}>5 Item | ₹300</Text>
      </View>
      <TouchableOpacity
        onPress={navigate}
        style={[style.button, style.goldenButton]}>
        <Text style={style.order}>ORDER NOW</Text>
      </TouchableOpacity>
    </View>
  );
}

export default withNavigation(OrderNow);

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    backgroundColor: 'red',
    paddingVertical: constants.MARGIN_VERTICAL_SMALL,
  },
  item: {
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
    color: colors.DARK_GOLDEN,
  },
  order: {
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
    color: colors.BLACK2,
  },
  blackButton: {
    backgroundColor: colors.BLACK2,
  },
  goldenButton: {
    backgroundColor: colors.DARK_GOLDEN,
  },
});
