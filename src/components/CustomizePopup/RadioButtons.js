import React, {Component} from 'react';
import styles from './style';
import {Text, View} from 'react-native';
import {ListItem, Radio, Left} from 'native-base';

import GeneralStyles from '../../screens/GeneralStyle';
import colors from '../../config/colors';
import CustomRadioButton from '../../components/CustomRadioButton';

var radio_props = [
  {label: 'param1', value: 0, thirdValue: 'hello'},
  {label: 'param2', value: 1},
  {label: 'param2', value: 1},
];

export default class RadioButtons extends Component {
  selectedValue = val => {};

  render() {
    const {title, radioData} = this.props;
    return (
      <View>
        {title && <Text style={styles.radioButtonsTitle}>{title}</Text>}
        <CustomRadioButton data={radioData} onSelect={this.selectedValue} />
        <View style={styles.radioBottomBorderBox}>
          <View style={styles.radioBottomBorder}></View>
        </View>
      </View>
    );
  }
}
