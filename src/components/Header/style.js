import { StyleSheet, Platform } from 'react-native';

import constants from '../../config/constants';

export default StyleSheet.create({
  header: {
    zIndex: 100,
    position: 'relative',
    flexDirection: 'row',
    height: constants.WINDOW_HEIGHT * 0.05,
    // paddingBottom: constants.PADDING_VERTICAL_MEDIUM * 0.5,
    alignItems: 'center',
    // backgroundColor: "rgba(0,0,0,0.5)"
    marginTop: 0,
  },
  iconContainer: {
    paddingHorizontal: constants.PADDING_MEDIUM * 0.4,
  },
  icon: {
    width: constants.WINDOW_WIDTH * 0.05,
  },
  rightIconContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginRight: constants.MARGIN_SMALL,
    flexDirection: 'row',
  },
  rightIcon: {
    width: constants.WINDOW_WIDTH * 0.055,
    height: constants.WINDOW_WIDTH * 0.05,
    marginHorizontal: constants.MARGIN_SMALL,
  },
  screenName: {
    fontSize: constants.FONT_SMALL * 1.3,
    position: 'relative',
    top: -3,
    fontFamily: 'Nunito-Regular',
  },
  headerSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: 0,
    marginBottom: 10,
    borderBottomWidth: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Regular',
  },
  locationText: {
    fontSize: constants.FONT_SMALL * 0.85,
    fontFamily: 'Nunito-Regular',
    width: constants.WINDOW_WIDTH * 0.6,
  },
  downArrow: {
    width: constants.WINDOW_WIDTH * 0.03,
    height: constants.WINDOW_WIDTH * 0.03,
    marginHorizontal: constants.MARGIN_X_SMALL,
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.6,
  },
});
