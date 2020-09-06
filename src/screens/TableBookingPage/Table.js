import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import colors from '../../config/colors';
import constants from '../../config/constants';

function Table(props) {
  function handlePress(){
    props.onPress(props.data)
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[style.tablesMiniContainer]}>
        {!!props.data.run_time && (
          <Text allowFontScaling={false} style={style.remainingTime}>
            {props.data.run_time}
          </Text>
        )}
        <Text allowFontScaling={false} style={style.tableNo}>
          {props.data.table_no}
        </Text>
        {!!props.data.amount && (
          <Text allowFontScaling={false} style={style.cost}>
            {props.data.amount}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default Table;

const style = StyleSheet.create({
  tablesMiniContainer: {
    backgroundColor: colors.WHITE,
    paddingVertical: constants.PADDING_X_SMALL,
    marginVertical: constants.MARGIN_VERTICAL_XSMALL,
    marginHorizontal: 3,
    width: constants.WINDOW_WIDTH * 0.28,
    height: constants.WINDOW_WIDTH * 0.3,
    borderRadius: constants.WINDOW_WIDTH * 0.06,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  remainingTime: {
    textAlign: 'center',
    color: colors.RED,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  tableNo: {
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  cost: {
    textAlign: 'center',
    color: colors.RED,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 1.3,
  },
});
