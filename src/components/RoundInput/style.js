import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  searchBarContainer: {
    borderWidth: 0.5,
    borderColor: colors.LIGHT_GREY,
    backgroundColor: colors.LIGHT_GREY,
    width: '100%',
    alignSelf: 'center',
    borderRadius: constants.WINDOW_WIDTH * 0.45,
    paddingLeft: 10,
    height: constants.WINDOW_WIDTH * 0.12,
    justifyContent: 'center',
    marginBottom: constants.MARGIN_MEDIUM,
  },
  borderBottomZero: {
    borderBottomWidth: 0,
  },
});
