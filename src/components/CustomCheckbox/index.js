import React, {Component} from 'react';
import styles from './style';
import {Text, View, TouchableOpacity} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import GeneralStyles from '../../screens/GeneralStyle';

class CustomCheckbox extends Component {
  state = {
    checkBoxIndex: [],
  };

  selectCheckBox(val, i) {
    const {checkBoxIndex} = this.state;
    const {onChecked} = this.props;
    const index = checkBoxIndex.indexOf(i);
    if (index !== -1) checkBoxIndex.splice(index, 1);
    else {
      checkBoxIndex.push(i);
      onChecked(val);
    }
    this.setState({checkBoxIndex});
  }

  render() {
    const {checkBoxIndex} = this.state;
    const {data} = this.props;
    return data.map((val, i) => (
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={GeneralStyles.flexRow}
          onPress={() => this.selectCheckBox(val, i)}>
          <FeatherIcon
            name={'check'}
            size={18}
            style={[
              styles.checkboxCircle,
              checkBoxIndex.includes(i)
                ? styles.selectedBox
                : styles.unSelectedBox,
            ]}
          />
          <Text style={styles.checkboxValue}>{val.value}</Text>
        </TouchableOpacity>
        <Text style={styles.checkboxAmount}>{val.value2}</Text>
      </View>
    ));
  }
}

export default CustomCheckbox;
