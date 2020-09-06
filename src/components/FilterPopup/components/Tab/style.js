import {StyleSheet} from 'react-native';

import constants from '../../../../config/constants';
import colors from '../../../../config/colors';

export default StyleSheet.create({
  container: {paddingHorizontal: constants.PADDING_MEDIUM},
  tabActive: {
    borderColor: colors.RED,
    borderBottomWidth: 2,
  },
  tabTextStyle: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL * 1.3,
  },
  tabTextUnselected: {
    color: colors.GREY,
  },
});
