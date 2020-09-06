import {StyleSheet} from 'react-native';

import constants from '../../config/constants';

export default StyleSheet.create({
  image: {
    width: constants.WINDOW_WIDTH * 0.35,
    height: constants.WINDOW_WIDTH * 0.35,
  },
  innerImage: {
    borderRadius: (constants.WINDOW_WIDTH * 0.35)/ 2,
  },
});
