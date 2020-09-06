import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import constants from '../../config/constants';

const CategoryHeader = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Text style={styles.title}>{props.title}</Text>
  </TouchableOpacity>
);

CategoryHeader.defaultProps = {
  title: 'Pizza',
};

export default CategoryHeader;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_MEDIUM * 0.7,
    marginVertical: constants.MARGIN_VERTICAL_XSMALL,
  },
});
