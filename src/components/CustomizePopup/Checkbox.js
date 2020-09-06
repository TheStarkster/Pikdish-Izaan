import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './style';

import CustomCheckbox from '../../components/CustomCheckbox';

class Checkbox extends Component {
  selectedValue = val => {};
  
  render() {
    const {title, data} = this.props;
    return (
      <View style={styles.popupCheckboxContainer}>
        <Text style={styles.checkBoxTitle}>{title}</Text>
        <CustomCheckbox data={data} onChecked={this.selectedValue} />
      </View>
    );
  }
}

export default Checkbox;
