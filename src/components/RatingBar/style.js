import {StyleSheet} from 'react-native';
import constants from '../../config/constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.3
  },
  ratingStarIcon: {
    marginLeft: constants.MARGIN_X_SMALL,
    width: constants.WINDOW_WIDTH * 0.04,
  },
  ratingPlaceholder: {
    fontFamily: 'Nunito-Regular',
    // lineHeight: 10,
    fontSize: constants.FONT_SMALL * 0.8,
  },
  rating: {
    fontFamily: 'Nunito-Regular',
    marginLeft: constants.MARGIN_X_SMALL * 1.3,
    fontSize: constants.FONT_SMALL * 0.8,
    // lineHeight: 10,
  },
});
