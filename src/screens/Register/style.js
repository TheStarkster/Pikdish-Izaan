import {StyleSheet} from 'react-native';

import constants from '../../config/constants';

export default StyleSheet.create({
  smallFonts: {
    fontSize: constants.FONT_SMALL,
  },
  countryPhoneCodeInput: {
    width: constants.WINDOW_WIDTH * 0.13,
    marginRight: constants.MARGIN_SMALL,
  },
});
