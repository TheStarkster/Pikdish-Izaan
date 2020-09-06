import React from 'react';
import {StyleSheet, Text} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const placeholder = {
  label: 'Number of people',
  value: null,
  color: '#9EA0A4',
};

const data = new Array(20)
  .fill(0)
  .map((_, i) => ({label: (i + 1).toString(), value: i + 1}));

function NumberPicker(props) {
  return (
    <RNPickerSelect
      useNativeAndroidPickerStyle={false}
      onValueChange={value => console.log('value')}
      value={props.value}
      items={data}
      placeholder={placeholder}
      style={pickerSelectStyles}
      Icon={() => null}
    />
  );
}

export default NumberPicker;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: 'black',
    height: '100%',
    marginLeft: 5,
    borderTopWidth: 0,
  },
  inputAndroid: {
    color: 'black',
    height: '100%',
  },
});
