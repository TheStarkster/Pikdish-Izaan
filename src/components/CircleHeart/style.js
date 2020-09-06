import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    width: constants.WINDOW_WIDTH * 0.07,
    height: constants.WINDOW_WIDTH * 0.07,
    borderRadius: (constants.WINDOW_WIDTH * 0.07) / 2,
    borderColor: colors.GREY,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: '50%',
    height: '50%',
  },
});
