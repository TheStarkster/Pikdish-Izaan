import {StyleSheet} from 'react-native';

import colors from '../../config/colors';
import constants from '../../config/constants';

export default StyleSheet.create({
  disabledButton: {
    opacity: 0.8,
  },
  button: {
    backgroundColor: colors.RED,
    justifyContent: 'center',
    width: '50%',
    marginTop: constants.MARGIN_MEDIUM,
    textTransform: 'none',
  },
});
