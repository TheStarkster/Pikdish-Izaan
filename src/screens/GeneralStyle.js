import {StyleSheet} from 'react-native';

import constants from '../config/constants';
import colors from '../config/colors';

export default StyleSheet.create({
  container: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 2,
    paddingHorizontal: constants.PADDING_MEDIUM * 0.5,
    paddingBottom: constants.PADDING_MEDIUM,
  },
  secondContainer: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
    paddingHorizontal: constants.PADDING_MEDIUM * 0.8,
    paddingBottom: constants.PADDING_MEDIUM,
  },
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  w100: {
    width: '100%',
  },
  h100: {
    height: '100%',
  },
  fullHeight: {
    height: constants.WINDOW_HEIGHT,
  },
  minHeight100: {
    minHeight: '100%',
  },
  fontMedium: {
    fontSize: constants.FONT_MEDIUM,
  },
  fontExtraSmall: {
    fontSize: constants.FONT_X_SMALL,
    fontFamily: 'Nunito-Regular',
  },
  fontSmall: {
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Regular',
  },
  fontRed: {
    color: colors.RED,
  },
  fontGrey: {
    color: colors.GREY,
  },
  fontLightWhite: {
    color: colors.LIGHT_WHITE,
  },
  smallMarginTop: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.5,
  },
  horizontalMarginXSmall: {
    marginHorizontal: constants.MARGIN_X_SMALL,
  },
  smallMarginLeft: {
    marginLeft: constants.MARGIN_SMALL,
  },
  smallMarginRight: {
    marginRight: constants.MARGIN_SMALL,
  },
  mediumMarginTop: {
    marginTop: constants.MARGIN_VERTICAL_SMALL,
  },
  noMarginTop: {
    marginTop: 0,
  },
  largeMarginTop: {
    marginTop: constants.MARGIN_LARGE,
  },
  XlargeMarginTop: {
    marginTop: constants.MARGIN_XLARGE,
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  textBlack: {
    color: 'black',
  },
  textTransformNone: {
    // textTransform: 'none',
    textTransform: 'capitalize',
  },
  mediumHeading: {
    fontSize: constants.FONT_MEDIUM,
    fontWeight: 'bold',
  },
  windowWidth: {
    width: constants.WINDOW_WIDTH,
  },
  backgroundLightGrey: {
    backgroundColor: colors.BG_GREY,
  },
  boxBorder: {
    borderColor: colors.GREY,
    borderWidth: 0,
    borderRadius: 10,
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
