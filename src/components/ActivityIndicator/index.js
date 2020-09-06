import React from 'react';
import {View, ActivityIndicator as AI} from 'react-native';
import {connect} from 'react-redux';

import style from './style';

function ActivityIndicator(props) {
  return (
    <View style={style.container}>
      {props.loading && <AI size="large" color={props.theme.theme_colour} />}
    </View>
  );
}

const mapStateToProps = store => ({
  theme: store.theme.appTheme,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityIndicator);
