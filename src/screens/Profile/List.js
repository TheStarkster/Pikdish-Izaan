import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

const List = props => {
  if (props.icons) {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <View style={style.container}>
          <View style={style.leftContainer}>
            <Image
              resizeMode="cover"
              style={style.leftIcon}
              source={props.leftIcon}
            />
          </View>
          <View style={style.middleContainer}>
            <Text style={style.label}>{props.label}</Text>
            {props.isNew && (
              <View style={style.newContainer}>
                <Text style={style.newText}>New</Text>
              </View>
            )}
          </View>
          <View style={style.rightContainer}>
            <Image
              resizeMode="contain"
              style={style.rightIcon}
              source={props.rightIcon}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <View style={[style.container, style.containerSecond]}>
          <View style={[style.middleContainer]}>
            <Text style={style.bigLabel}>{props.label}</Text>
          </View>
          <View style={[style.rightContainer]}>
            <Image
              resizeMode="contain"
              style={style.rightIcon}
              source={props.rightIcon}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

List.defaultProps = {
  leftIcon: require('../../assets/icon/edit-icon.png'),
  rightIcon: require('../../assets/icon/forward.png'),
  label: 'Edit Profile',
  onPress: function(){}
};

export default List;

const style = StyleSheet.create({
  container: {
    height: constants.WINDOW_HEIGHT * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: "red"
    // marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.1,
  },
  containerSecond: {
    // marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.01,
    height: constants.WINDOW_HEIGHT * 0.05
  },
  leftContainer: {
    width: constants.WINDOW_WIDTH * 0.1,
    height: '90%',
  },
  middleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newContainer: {
    marginHorizontal: constants.MARGIN_SMALL,
    backgroundColor: colors.RED,
    paddingVertical: constants.PADDING_X_SMALL * 0.5,
    paddingHorizontal: constants.PADDING_X_SMALL * 1.8,
    borderRadius: 4,
  },
  newText: {
    color: colors.WHITE,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL * 0.8,
  },
  rightContainer: {
    width: constants.WINDOW_WIDTH * 0.12,
    height: '100%',
  },
  leftIcon: {
    width: '90%',
    height: '90%',
  },
  rightIcon: {
    width: '50%',
    height: '50%',
  },
  label: {
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Regular',
    paddingLeft: constants.PADDING_SMALL,
  },
  bigLabel: {
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Regular',
  },
});
