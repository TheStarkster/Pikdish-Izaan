import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: constants.MARGIN_LARGE * 0.3,
  },
  radioLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 0.9,
  },
  amount: {
    color: colors.GREY,
    marginLeft: constants.MARGIN_SMALL,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
});
