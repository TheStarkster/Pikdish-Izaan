import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  restaurantDetails: {
    flexDirection: 'row',
    // alignItems: 'center',
    borderColor: colors.GREY,
    borderBottomWidth: 0.5,
    // paddingBottom: constants.PADDING_MEDIUM,
    // paddingHorizontal: constants.PADDING_MEDIUM * 0.2,
    paddingVertical: 5,
  },
  restaurantImageContainer: {
    width: constants.WINDOW_WIDTH * 0.24,
  },
  restaurantImage: {
    width: '100%',
    height: constants.WINDOW_WIDTH * 0.24,
    borderRadius: 20,
  },
  restaurantImageAfter: {
    marginTop: -5,
    paddingTop: 0,
    marginLeft: constants.MARGIN_MEDIUM * 0.4,
    // marginRight: constants.MARGIN_LARGE,
    flex: 1,
  },
  restaurantName: {
    fontSize: constants.FONT_SMALL * 1.2,
    fontFamily: 'Nunito-Bold',
  },
  star: {
    width: constants.WINDOW_WIDTH * 0.04,
    height: constants.WINDOW_WIDTH * 0.04,
  },
  rating: {
    marginLeft: constants.MARGIN_SMALL * 0.3,
    fontSize: constants.FONT_SMALL * 0.9,
    fontFamily: 'Nunito-Regular',
  },
  cuisine: {
    color: colors.BLACK,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL,
    // borderBottomColor: colors.GREY,
    // borderBottomWidth: 0.5,
    marginTop: -constants.MARGIN_VERTICAL_XSMALL * 0.3,
    paddingBottom: constants.PADDING_VERTICAL_MEDIUM * 0.3,
  },
  line: {
    borderBottomColor: colors.GREY,
    borderBottomWidth: 0.5,
  },
  dot: {
    marginLeft: constants.MARGIN_SMALL * 0.6,
    width: constants.WINDOW_WIDTH * 0.015,
    height: constants.WINDOW_WIDTH * 0.015,
  },
  time: {
    marginLeft: constants.MARGIN_SMALL * 0.6,
    fontSize: constants.FONT_SMALL * 0.9,
    fontFamily: 'Nunito-Regular',
  },
  discountLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL,
    color: colors.YELLOW,
  },
});
