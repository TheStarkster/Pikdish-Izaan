import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './style';

class FilterPopupButtons extends Component {
  render() {
    return (
      <View style={styles.filterButtonsContainer}>
        <View style={[styles.buttonBox, {marginLeft: 0}]}>
          <TouchableOpacity>
            <Text style={styles.buttonText}>Clean All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity>
            <Text style={styles.buttonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default FilterPopupButtons;
