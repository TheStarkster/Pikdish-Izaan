import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import style from './style';

function Button(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[style.container, props.containerStyles]}>
      <Text style={style.label}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const mapStateToProps = store => ({
  theme: store.theme.appTheme,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Button));
