import React from 'react';
import styles from './style';
import {Text, View, TouchableOpacity} from 'react-native';

function Button(props) {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={props.onPress}
        style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Item Total ₹{props.total}</Text>
        <Text style={styles.buttonText}>ADD Item</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Button;
