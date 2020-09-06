import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import constants from '../../config/constants';
import colors from '../../config/colors';

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

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GREY,
    borderWidth: 1,
    borderRadius: 30,
    marginHorizontal: constants.MARGIN_X_SMALL,
  },
  label: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL_FIXED,
  },
});
