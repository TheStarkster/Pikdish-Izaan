import React from 'react';
import ConfirmationCodeInput from 'react-native-confirmation-code-input';

import style from './style';
import constants from '../../config/constants';
import colors from '../../config/colors';

const CodeInput = props => (
  <ConfirmationCodeInput
    ref={value => props.customRef(value)}
    keyboardType="number-pad"
    secureTextEntry={props.secureTextEntry}
    className="border-b"
    codeLength={6}
    activeColor={colors.RED}
    inactiveColor={colors.LIGHT_GREY}
    size={constants.WINDOW_WIDTH * 0.11}
    inputPosition="left"
    onFulfill={props.onFulfill}
    containerStyle={style.containerStyle}
    codeInputStyle={style.codeInputStyle}
  />
);

CodeInput.defaultProps = {
  secureTextEntry: false,
  onFulfill: function() {},
  customRef: function() {},
};

export default CodeInput;
