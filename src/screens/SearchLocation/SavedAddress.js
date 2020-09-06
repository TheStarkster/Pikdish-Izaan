import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

import authActions from '../../redux/auth/action';
import constants from '../../config/constants';
import colors from '../../config/colors';

const SavedAddress = function(props) {
  function setLocation() {
    props.setLocation(props.address);
    props.navigation.goBack();
  }

  return (
    <TouchableOpacity onPress={setLocation}>
      <View style={style.container}>
        <Text style={style.addressTitle}>{props.data.label_name}</Text>
        <Text style={style.address}>{props.data.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setLocation: authActions.setLocation,
};

SavedAddress.defaultProps = {
  data: {},
  address: '2025 M Street, Northwest, Washington, DC 20036.',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(SavedAddress));

const style = StyleSheet.create({
  container: {
    // marginVertical: constants.MARGIN_SMALL * 0.5,
    // marginTop: constants.MARGIN_SMALL * 1.4,
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT_GREY,
    paddingBottom: constants.PADDING_SMALL * 0.5,
  },
  addressTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL,
  },
  address: {
    fontFamily: 'Nunito-Light',
    fontSize: constants.FONT_SMALL * 0.85,
  },
});
