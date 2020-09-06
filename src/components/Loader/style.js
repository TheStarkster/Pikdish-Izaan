import {StyleSheet} from 'react-native';

import colors from '../../config/colors';
import constants from '../../config/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.OVERLAY_COLOR,
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  loadingText: {
    color: colors.WHITE,
    fontSize: constants.FONT_MEDIUM,
    textAlign: 'center',
  },
  loadingImage: {
    width: constants.WINDOW_WIDTH * 0.3,
    height: constants.WINDOW_WIDTH * 0.3,
  },
});
