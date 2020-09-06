import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  input: {
    marginLeft: 0,
  },
  label: {
    fontSize: constants.FONT_SMALL,
    color: colors.RED,
  },
  focusedInput: {borderBottomColor: colors.RED, borderBottomWidth: 1},
});
