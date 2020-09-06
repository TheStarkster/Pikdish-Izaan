import React from 'react';
import {TextInput} from 'react-native';
import {Input, Item} from 'native-base';

import colors from '../../config/colors';
import style from './style';

const BorderedInput = props => {
  function doFocus(el) {
    if (el) {
      setTimeout(() => el.focus(), 500);
      // el.focus();
    }
  }

  return (
    <Item style={style.container} regular>
      <TextInput
        value={props.value}
        maxLength={props.maxLength}
        onChangeText={props.onChangeText}
        ref={doFocus}
        placeholderTextColor={colors.GREY}
        style={style.input}
        placeholder={props.placeholder}
      />
    </Item>
  );
};

export default BorderedInput;
