import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';

import style from './style';

function Tab(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        style.container,
        props.active && {
          borderColor: props.theme.theme_colour,
          borderBottomWidth: 1,
        },
      ]}>
      <Text style={[style.label, props.labelStyles]}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const mapStateToProps = store => ({
  theme: store.theme.appTheme,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
