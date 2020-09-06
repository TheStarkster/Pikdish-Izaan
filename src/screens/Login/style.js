import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  logo: {
    height: constants.WINDOW_HEIGHT * 0.07,
    width: constants.WINDOW_WIDTH * 0.65,
    // borderRadius: 20,
    marginVertical: constants.MARGIN_VERTICAL_XSMALL,
  },
  topContainer: {
    height: constants.WINDOW_HEIGHT * 0.23,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeHeading: {
    fontSize: constants.FONT_MEDIUM * 1.4,
    fontFamily: 'Nunito-Regular',
  },
  label: {
    fontSize: constants.FONT_SMALL,
    color: colors.GREY,
    fontFamily: 'Nunito-Regular',
  },
  inputContainerStyles: {
    marginTop: constants.MARGIN_MEDIUM,
  },
  form: {
    // marginTop: constants.MARGIN_VERTICAL_SMALL,
  },
  countryPhoneCodeInput: {
    width: constants.WINDOW_WIDTH * 0.13,
    // marginRight: constants.MARGIN_SMALL,
  },
  newUser: {
    marginTop: constants.MARGIN_MEDIUM,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  or: {
    fontSize: constants.FONT_SMALL * 1.2,
    textAlign: 'center',
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.6,
    fontFamily: 'Nunito-Regular',
  },
});
