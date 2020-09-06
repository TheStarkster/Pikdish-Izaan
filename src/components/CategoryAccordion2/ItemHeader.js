import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';
import GeneralStyle from '../../screens/GeneralStyle';

const ItemHeader = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={style.header}>
      <View style={GeneralStyle.flex1}>
        <Text style={style.title}> {props.title}</Text>
        <Text style={[style.amount, GeneralStyle.flex1, GeneralStyle.flexWrap]}>
          {props.amount}
        </Text>
      </View>
      <Image
        source={require('../../assets/icon/down.png')}
        style={style.downArrow}
      />
    </View>
  </TouchableOpacity>
);

ItemHeader.defaultProps = {
  amount: "11 items: 6'' American Pizza and More...",
  title: 'First Element',
};

export default ItemHeader;

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: constants.PADDING_VERTICAL_MEDIUM,
    paddingRight: constants.PADDING_SMALL,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.GREY,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0.5,
  },
  downArrow: {
    width: constants.WINDOW_WIDTH * 0.035,
    height: constants.WINDOW_WIDTH * 0.035,
  },
  title: {
    fontSize: constants.FONT_SMALL * 0.9,
    fontFamily: 'Nunito-Bold',
  },
  amount: {
    fontSize: constants.FONT_SMALL * 0.8,
    color: colors.GREY,
    fontFamily: 'Nunito-Regular',
  },
});
