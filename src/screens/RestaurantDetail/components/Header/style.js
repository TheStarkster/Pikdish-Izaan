import {StyleSheet} from 'react-native';

import constants from '../../../../config/constants';
import colors from '../../../../config/colors';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: constants.PADDING_MEDIUM,
    paddingVertical: constants.PADDING_SMALL * 1.2,
    borderColor: colors.GREY,
    borderBottomWidth: 1,
  },
  headerRestaurantName: {
    fontSize: constants.FONT_SMALL * 1.2,
    fontFamily: 'Nunito-Regular',
  },
  colorBox: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.5,
  },
  restaurantDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAddress: {
    marginTop: -constants.MARGIN_VERTICAL_XSMALL * 0.5,
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Regular',
    // lineHeight: 15,
  },
  headerPrice: {
    fontSize: constants.FONT_X_SMALL,
    fontFamily: 'Nunito-Regular',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  starIcon: {
    width: constants.WINDOW_WIDTH * 0.04,
    color: colors.BROWN,
  },
  headerRating: {
    fontFamily: 'Nunito-Regular',
    color: colors.BROWN,
    marginLeft: constants.MARGIN_SMALL * 0.7,
  },
  headerRatingCount: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL,
    lineHeight: 15,
  },
});
