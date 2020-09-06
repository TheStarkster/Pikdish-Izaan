import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    paddingVertical: constants.PADDING_VERTICAL_MEDIUM,
    paddingHorizontal: constants.PADDING_SMALL * 0.5,
    backgroundColor: colors.RED,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: constants.WINDOW_WIDTH * 0.08,
    height: constants.WINDOW_WIDTH * 0.08,
  },
  mainHeading: {
    color: "white",
    fontFamily: 'Nunito-Black',
    marginLeft: constants.MARGIN_SMALL * 0.4
  },
});
