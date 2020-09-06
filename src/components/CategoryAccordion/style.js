import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: constants.PADDING_VERTICAL_MEDIUM,
    paddingRight: constants.PADDING_SMALL,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.GREY,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0.5,
  },
  downArrow: {
    width: constants.WINDOW_WIDTH * 0.035,
    height: constants.WINDOW_WIDTH * 0.035,
  },
  title: {
    fontSize: constants.FONT_SMALL * 0.9,
    fontFamily: "Nunito-Bold"
  },
  amount: {
    fontSize: constants.FONT_SMALL,
    color: colors.GREY,
    fontFamily: "Nunito-Regular"
  },
});
