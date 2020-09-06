import {StyleSheet, Platform} from 'react-native';

import constants from '../../config/constants';

export default StyleSheet.create({
  headerMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: constants.PADDING_MEDIUM * 0.8,
    height: constants.WINDOW_HEIGHT * 0.05,
    marginTop: 0
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerFirstRightContent: {
    backgroundColor: 'red',
    width: constants.WINDOW_WIDTH * 0.05,
    borderRadius: constants.WINDOW_WIDTH * 0.025,
    height: constants.WINDOW_HEIGHT * 0.025,
    textAlign: 'center',
    fontSize: 12,
    marginRight: 5,
  },
  locationText: {
    width: constants.WINDOW_WIDTH * 0.6,
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Regular',
  },
  location: {
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Regular',
  },
  downArrow: {
    width: constants.WINDOW_WIDTH * 0.03,
    height: constants.WINDOW_WIDTH * 0.03,
    marginHorizontal: constants.MARGIN_X_SMALL,
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.6,
  },
  discountIcon: {
    width: constants.WINDOW_WIDTH * 0.05,
    height: constants.WINDOW_WIDTH * 0.05,
    marginHorizontal: constants.MARGIN_X_SMALL,
  },
});
