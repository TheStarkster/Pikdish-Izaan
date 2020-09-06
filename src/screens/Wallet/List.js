import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';
import GeneralStyle from '../GeneralStyle';

function List(props) {
  return (
    <View style={[style.container, props.containerStyles]}>
      <Text style={style.label}>{props.label}</Text>
      <Text style={style.value}>₹ {props.value}</Text>
    </View>
  );
}

List.defaultProps = {
  containerStyles: {},
};

export default List;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: constants.PADDING_VERTICAL_MEDIUM,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: colors.GREY,
  },
  label: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  value: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 1.1,
  },
});
