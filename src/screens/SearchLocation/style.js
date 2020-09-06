import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  mainContainer: {
    // backgroundColor: colors.LIGHTEST_GREY,
    flex: 1,
  },
  searchBarContainer: {
    borderWidth: 0.5,
    borderColor: colors.LIGHT_GREY,
    backgroundColor: colors.LIGHT_GREY,
    width: '100%',
    alignSelf: 'center',
    borderRadius: constants.WINDOW_WIDTH * 0.45,
    paddingLeft: 10,
    height: constants.WINDOW_WIDTH * 0.12,
    justifyContent: 'center',
    marginBottom: constants.MARGIN_MEDIUM,
  },
  borderBottomZero: {
    borderBottomWidth: 0,
  },
  currentLocationContainer: {
    paddingTop: constants.PADDING_MEDIUM,
    paddingBottom: constants.PADDING_X_SMALL,
    borderColor: colors.GREY,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  currentLocationText: {
    fontSize: constants.FONT_SMALL,
    color: colors.RED,
    fontFamily: 'Nunito-Bold',
  },
  savedAddressText: {
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Bold',
    marginTop: constants.MARGIN_SMALL,
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT_GREY,
    paddingBottom: constants.PADDING_SMALL,
  },
  buttonContainer: {
    paddingVertical: constants.PADDING_SMALL,
    borderColor: colors.GREY,
    borderBottomWidth: 0.3,
    marginBottom: constants.MARGIN_VERTICAL_XSMALL,
  },
  addAddressText: {
    fontSize: constants.FONT_SMALL,
    color: colors.RED,
    fontFamily: 'Nunito-Bold',
  },
  recentLocationText: {
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Bold',
    marginTop: constants.MARGIN_SMALL * 0.4,
  },
  recentLocations: {
    fontFamily: 'Nunito-Regular',
    marginTop: constants.MARGIN_SMALL,
    borderTopWidth: 1,
    borderTopColor: colors.LIGHT_GREY,
    paddingTop: constants.PADDING_SMALL,
    fontSize: constants.FONT_SMALL,
  },
});
