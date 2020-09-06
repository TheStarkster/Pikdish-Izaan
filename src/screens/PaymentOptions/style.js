import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  payableContainer: {
    paddingVertical: constants.PADDING_VERTICAL_MEDIUM,
    borderColor: colors.GREY,
    borderBottomWidth: 1,
  },
  payableLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_MEDIUM * 0.7,
    textAlign: 'center',
  },
  payableAmount: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_MEDIUM * 0.9,
    textAlign: 'center',
  },
  paytmIconStyle: {
    width: constants.WINDOW_WIDTH * 0.24,
    height: constants.WINDOW_HEIGHT * 0.04,
  },
  payumoneyStyle: {
    width: constants.WINDOW_WIDTH * 0.6,
    height: constants.WINDOW_HEIGHT * 0.08,
  },
});
