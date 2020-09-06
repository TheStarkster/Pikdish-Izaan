import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import colors from '../../config/colors';
import constants from '../../config/constants';
import GeneralStyle from '../GeneralStyle';
import {connect} from 'react-redux';

function BlankBox(props) {
  return (
    <View style={style.container}>
      <Text style={[style.departmentName, {color: props.theme.theme_colour}]}>
        {props.data.dept_name}
      </Text>
    </View>
  );
}

const mapStateToProps = store => ({
  theme: store.theme.appTheme,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BlankBox);

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.WHITE,
    borderRadius: 30,
    ...GeneralStyle.boxShadow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  departmentName: {
    textAlign: 'center',
    color: colors.RED,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
});
