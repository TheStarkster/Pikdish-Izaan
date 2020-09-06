import {StyleSheet} from 'react-native';

import colors from '../../config/colors';
import constants from '../../config/constants';

export default StyleSheet.create({
  button: {
    borderColor: colors.LIGHT_GREY,
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
    justifyContent: 'flex-start',
    paddingHorizontal: constants.PADDING_MEDIUM,
  },
  icon: {
    width: constants.WINDOW_WIDTH * 0.06,
    height: constants.WINDOW_WIDTH * 0.06,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: constants.FONT_SMALL * 1.1,
    paddingHorizontal: constants.PADDING_SMALL,
  },
});
