import {StyleSheet} from 'react-native';

import constants from '../../config/constants';

export default StyleSheet.create({
  container: {
    marginTop: 5,
    width: constants.WINDOW_WIDTH * 0.6,
    height: constants.WINDOW_WIDTH * 0.4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: constants.WINDOW_WIDTH * 0.08,
  },
});
