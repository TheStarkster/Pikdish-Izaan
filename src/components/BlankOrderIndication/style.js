import {StyleSheet} from 'react-native';

import constants from '../../config/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: constants.FONT_SMALL * 1.2,
    textAlign: 'center',
  },
  icon: {
    width: constants.WINDOW_WIDTH * 0.7,
    height: constants.WINDOW_WIDTH * 0.4,
  },
});
