import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  image: {
    width: constants.WINDOW_WIDTH,
    height: constants.WINDOW_HEIGHT * 0.5,
    // borderRadius: 20
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: constants.MARGIN_VERTICAL_SMALL,
  },
  indicator: {
    width: constants.WINDOW_WIDTH * 0.03,
    height: constants.WINDOW_WIDTH * 0.03,
    borderRadius: constants.WINDOW_WIDTH * 0.02,
    backgroundColor: colors.GREY,
    marginHorizontal: constants.MARGIN_X_SMALL * 0.6,
  },
  active: {
    backgroundColor: colors.RED,
  },
  detailContainer: {
    borderRadius: 10,
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
    // height: constants.WINDOW_HEIGHT * 0.2,
    justifyContent: 'center',
    // backgroundColor: colors.BLACK,
    // paddingHorizontal: constants.PADDING_MEDIUM * 1.5,
    position: 'relative',
    zIndex: 1,
    // backgroundColor: "red"
  },
  heading: {
    color: 'black',
    fontSize: constants.FONT_MEDIUM * 0.8,
    marginBottom: constants.MARGIN_VERTICAL_SMALL,
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
  },
  description: {
    color: 'black',
    textAlign: 'center',
    fontSize: constants.FONT_SMALL,
    marginBottom: constants.MARGIN_VERTICAL_XSMALL,
    fontFamily: 'Nunito-Regular',
  },
  leftCutter: {
    position: 'absolute',
    top: constants.WINDOW_HEIGHT * 0.06,
    left: -(constants.WINDOW_WIDTH * 0.15) / 2,
    width: constants.WINDOW_WIDTH * 0.15,
    borderRadius: (constants.WINDOW_WIDTH * 0.15) / 2,
    height: constants.WINDOW_WIDTH * 0.15,
    backgroundColor: colors.BG_GREY,
    zIndex: 10,
  },
  rightCutter: {
    position: 'absolute',
    top: constants.WINDOW_HEIGHT * 0.06,
    right: -(constants.WINDOW_WIDTH * 0.15) / 2,
    width: constants.WINDOW_WIDTH * 0.15,
    borderRadius: (constants.WINDOW_WIDTH * 0.15) / 2,
    height: constants.WINDOW_WIDTH * 0.15,
    backgroundColor: colors.BG_GREY,
    zIndex: 10,
  },
});
