import React from 'react';
import {Button as NativeButton, Text, Image} from 'native-base';
import {connect} from 'react-redux';

import GeneralStyle from '../../screens/GeneralStyle';
import style from './style';

const Button = props => {
  if (props.isLoading) {
    return (
      <Image
        source={{
          uri: constants.BASE_PIC_PATH + props.theme.loading_image,
        }}
        style={{width: 50, height: 50}}
      />
    );
  }

  return (
    <NativeButton
      onPress={props.onPress}
      disabled={props.disabled}
      style={[
        style.button,
        props.buttonStyles,
        {backgroundColor: props.theme.theme_colour},
        props.disabled && style.disabledButton,
      ]}
      {...props}>
      <Text style={GeneralStyle.textTransformNone}>{props.children}</Text>
    </NativeButton>
  );
};

Button.defaultProps = {
  buttonStyles: {},
  disabled: false,
  onPress: function() {},
};

const mapStateToProps = store => ({
  theme: store.theme.appTheme,
});

export default connect(mapStateToProps, {})(Button);
