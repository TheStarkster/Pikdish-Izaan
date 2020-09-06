import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    height: constants.WINDOW_HEIGHT * 0.075,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: constants.TAB_ICON_WIDTH,
    height: constants.TAB_ICON_HEIGHT,
  },
  label: {
    color: colors.BLACK,
    fontSize: constants.WINDOW_WIDTH * 0.03,
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
  },
  activeLabel: {
    color: colors.RED,
  },
});
