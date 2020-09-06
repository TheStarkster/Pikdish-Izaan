import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    height: constants.WINDOW_HEIGHT * 0.1,
    backgroundColor: colors.BLACK,
    paddingHorizontal: constants.PADDING_SMALL,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  image: {
    width: constants.WINDOW_WIDTH * 0.07,
    height: constants.WINDOW_WIDTH * 0.07,
  },
  viewCart: {
    fontSize: constants.FONT_SMALL * 0.9,
    color: 'white',
    marginLeft: constants.MARGIN_SMALL,
    fontFamily: 'Nunito-Regular',
  },
  price: {
    color: colors.YELLOW,
    fontSize: constants.FONT_SMALL * 0.9,
    fontFamily: 'Nunito-Regular',
    marginHorizontal: constants.MARGIN_X_SMALL,
  },
});
