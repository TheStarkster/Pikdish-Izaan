import { StyleSheet, Platform } from 'react-native';

import colors from '../../config/colors';
import constants from '../../config/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.OVERLAY_COLOR,
    flex: 1,
    marginTop: 0
  },
  header: {
    height: constants.WINDOW_HEIGHT * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  iconContainer: {
    paddingHorizontal: constants.PADDING_MEDIUM * 0.4,
  },
  icon: {
    width: constants.WINDOW_WIDTH * 0.05,
  },
  textInput: {
    fontSize: constants.FONT_SMALL * 1.2,
    fontFamily: 'Nunito-Regular',
    flex: 1,
  },
});
