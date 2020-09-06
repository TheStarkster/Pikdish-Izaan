import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  badgeContainer: {
    // backgroundColor: colors.LIGHT_GREY,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    paddingHorizontal: 5,
    marginLeft: constants.MARGIN_X_SMALL,
  },
  date: {
    marginRight: constants.MARGIN_SMALL * 0.8,
    fontFamily: 'Nunito-Regular',
    color: colors.BLACK,
    fontSize: constants.FONT_X_SMALL,
  },
  time: {
    fontFamily: 'Nunito-Regular',
    color: colors.BLACK,
    fontSize: constants.FONT_X_SMALL,
  },
  clockIcon: {
    width: constants.WINDOW_WIDTH * 0.03,
    height: constants.WINDOW_WIDTH * 0.03,
    marginLeft: constants.MARGIN_X_SMALL,
  },
});
