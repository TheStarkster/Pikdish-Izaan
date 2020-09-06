import React from 'react';
import {View} from 'react-native';

import constants from '../../config/constants';
import styles from './style';
import CustomRadioButton from '../CustomRadioButton';

const radioButtonText = [
  {label: 'Relevance', value: constants.RESTAURANT_ORDER_BY_CODE.RELEVANCE},
  {
    label: 'Alphabetical',
    value: constants.RESTAURANT_ORDER_BY_CODE.ALPHABETICAL,
  },
  {label: 'Discount', value: constants.RESTAURANT_ORDER_BY_CODE.DISCOUNT},
  {label: 'Rating', value: constants.RESTAURANT_ORDER_BY_CODE.RATING},
  // {label: 'Pre-parathion Time', value: 1},
];

function SortTab(props) {
  function selectedValue(item) {
    props.onSelect(item);
  }

  return (
    <View>
      <CustomRadioButton
        selected={props.selected}
        data={radioButtonText}
        onSelect={selectedValue}
      />
      <View style={styles.bottomBorderLine}></View>
    </View>
  );
}

export default SortTab;
