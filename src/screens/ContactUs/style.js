import {StyleSheet} from 'react-native';

import constants, {calculateLineHeight} from '../../config/constants';
import colors from '../../config/colors.js';

export default StyleSheet.create({
  contactUsContainer: {
    backgroundColor: colors.BG_GREY,
    height: constants.WINDOW_HEIGHT,
  },
  logo: {
    height: constants.WINDOW_HEIGHT * 0.07,
    width: constants.WINDOW_WIDTH * 0.65,
    // borderRadius: 20,
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
  },
  dottedBorder: {
    borderWidth: 1,
    borderRadius: 1,
    borderStyle: 'dashed',
    borderColor: colors.GREY,
  },
  heading: {
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Regular',
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
  },
  text: {
    marginTop: constants.MARGIN_VERTICAL_MEDIUM,
    fontFamily: 'Nunito-Regular',
    marginTop: constants.MARGIN_VERTICAL_MEDIUM * 0.1,
    fontSize: constants.FONT_X_SMALL * 1.1,
    lineHeight: calculateLineHeight(constants.WINDOW_WIDTH * 0.051),
  },
  borderLine: {
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: colors.GREY,
    marginTop: constants.MARGIN_VERTICAL_SMALL * 0.9,
  },
  socialLinkContainer: {
    flexDirection: 'row',
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
    alignItems: 'center',
    flex: 1,
  },
  instagramIcon: {
    width: constants.WINDOW_WIDTH * 0.07,
    height: constants.WINDOW_WIDTH * 0.07,
  },
  socialLink: {
    marginLeft: constants.MARGIN_SMALL * 0.6,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_MEDIUM * 0.5,
  },
  pikdishActivitiesText: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL * 1.25,
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.6,
  },
  sliderContainer: {
    // marginBottom: constants.MARGIN_VERTICAL_MEDIUM * 5,
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
  },
});
