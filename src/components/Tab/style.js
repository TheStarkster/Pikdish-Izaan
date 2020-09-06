import {StyleSheet} from 'react-native';

import constants from '../../config/constants';

export default StyleSheet.create({
  container: {
    minHeight: constants.WINDOW_HEIGHT * 0.07,
    flex: 1,
    // padding: constants.PADDING_X_SMALL,
    justifyContent: 'center',
    marginHorizontal: constants.MARGIN_X_SMALL
  },
  label: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_X_SMALL * 1.25,
  },
});
