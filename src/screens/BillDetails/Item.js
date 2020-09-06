import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';
import ColoredCircle from '../../components/ColoredCircle';

function Item() {
  return (
    <View style={style.container}>
      <View>
        <View style={style.miniContainer}>
          <ColoredCircle style={style.greenCircle} />
          <Text style={style.itemName}>Sandwich Dhokla * 1</Text>
        </View>
        <Text style={style.quantity}>1 Plate</Text>
      </View>
      <Text style={style.itemAmount}>₹24</Text>
    </View>
  );
}

export default Item;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: constants.PADDING_MEDIUM * 0.8,
    paddingBottom: constants.PADDING_SMALL,
  },
  miniContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenCircle: {
    marginRight: constants.MARGIN_SMALL * 0.5,
    marginTop: constants.WINDOW_HEIGHT * 0.005,
    width: constants.WINDOW_WIDTH * 0.025,
    height: constants.WINDOW_WIDTH * 0.025,
  },
  itemName: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 0.9,
  },
  quantity: {
    color: colors.GREY,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 0.8,
    marginLeft: constants.MARGIN_MEDIUM,
  },
  itemAmount: {
    fontFamily: 'Nunito-Light',
    fontSize: constants.FONT_SMALL * 0.8,
  },
});
