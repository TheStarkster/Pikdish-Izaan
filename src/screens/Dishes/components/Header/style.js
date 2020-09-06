import {StyleSheet} from 'react-native';

import constants from '../../../../config/constants';
import colors from '../../../../config/colors';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.GREY,
    paddingBottom: constants.MARGIN_VERTICAL_SMALL,
    borderBottomWidth: 1,
  },
  restaurantDetails: {
    justifyContent: 'flex-start',
    marginLeft: constants.MARGIN_X_SMALL * 1.3,
    fontSize: constants.FONT_SMALL,
  },
  restaurantName: {
    fontFamily: 'Nunito-Regular',
  },
  restaurantDetails2: {
    marginLeft: constants.WINDOW_WIDTH * 0.03 + constants.MARGIN_X_SMALL * 1.3,
  },
  restaurantLabel: {
    color: colors.GREY,
    fontSize: constants.FONT_X_SMALL,
    borderColor: colors.GREY,
    paddingBottom: constants.MARGIN_VERTICAL_XSMALL,
    borderBottomWidth: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.5,
  },
  star: {
    width: constants.WINDOW_WIDTH * 0.035,
    height: constants.WINDOW_WIDTH * 0.035,
  },
  rating: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL,
    marginLeft: constants.MARGIN_X_SMALL,
  },
  time: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL,
    marginLeft: constants.MARGIN_X_SMALL,
  },
  tableContainer: {
    paddingHorizontal: constants.PADDING_SMALL,
    flex: 0.8,
    alignItems: 'flex-end',
  },
  table: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
});
