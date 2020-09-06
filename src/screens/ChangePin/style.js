import {StyleSheet} from 'react-native';

import constants from '../../config/constants';

export default StyleSheet.create({
  image: {
    width: constants.WINDOW_WIDTH * 0.45,
    height: constants.WINDOW_WIDTH * 0.45,
    marginTop: constants.MARGIN_SMALL,
  },
  message: {
    fontSize: constants.FONT_MEDIUM * 0.7,
    marginTop: constants.MARGIN_SMALL,
    textAlign: 'center',
  },
  countryPhoneCodeInput: {
    width: constants.WINDOW_WIDTH * 0.13,
    marginRight: constants.MARGIN_SMALL,
  },
});
