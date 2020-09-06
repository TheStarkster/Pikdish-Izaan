import {StyleSheet} from 'react-native';

import constants from '../../../../config/constants';
import colors from '../../../../config/colors';

export default StyleSheet.create({
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingHorizontal: constants.PADDING_MEDIUM * 1.2,
    // paddingVertical: constants.PADDING_MEDIUM,
  },
  loadingBox: {
    backgroundColor: colors.WHITE,
    width: constants.WINDOW_WIDTH * 0.35,
    marginLeft: constants.PADDING_SMALL,
    alignItems: 'center',
    marginBottom: constants.MARGIN_VERTICAL_SMALL,
    borderRadius: 5,
  },
  buttonBox: {
    backgroundColor: colors.RED,
    width: constants.WINDOW_WIDTH * 0.35,
    marginLeft: constants.PADDING_SMALL,
    alignItems: 'center',
    marginBottom: constants.MARGIN_VERTICAL_SMALL,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 1.1,
    padding: constants.PADDING_SMALL,
  },
});
