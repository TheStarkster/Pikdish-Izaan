import {StyleSheet} from 'react-native';

import colors from '../../../../config/colors';
import constants from '../../../../config/constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  amount: {
    color: colors.GREY,
    marginLeft: constants.MARGIN_SMALL,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  radioContainer: {
    borderColor: colors.BLACK,
  },
});
