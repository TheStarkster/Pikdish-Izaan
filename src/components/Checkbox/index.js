import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import colors from '../../config/colors';
import GeneralStyle from '../../screens/GeneralStyle';
import style from './style';

const CheckBox = props => {
  function handleChange(c) {
    props.onChange(props.data);
  }

  return (
    <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
      <TouchableOpacity
        style={[
          style.container,
          props.containerStyle,
          !!props.checked ? {backgroundColor: colors.RED} : style.unSelectedBox,
        ]}
        onPress={handleChange}>
        {!!props.checked && (
          <FeatherIcon name="check" size={18} style={[style.checkboxCircle]} />
        )}
        {!!props.value && (
          <Text style={style.checkboxValue}>{props.value}</Text>
        )}
      </TouchableOpacity>
      {props.label && (
        <Text onPress={handleChange} style={style.label}>
          {props.label}
        </Text>
      )}
    </View>
  );
};

CheckBox.defaultProps = {
  onChange: function() {},
  value: '',
  checkboxStyle: {},
};
export default CheckBox;
