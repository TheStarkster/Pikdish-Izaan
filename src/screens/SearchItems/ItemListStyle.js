import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: constants.WINDOW_HEIGHT * 0.1,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingHorizontal: constants.PADDING_MEDIUM * 0.4,
    marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.6,
  },
  image: {
    width: constants.WINDOW_WIDTH * 0.13,
    height: constants.WINDOW_WIDTH * 0.13,
    borderRadius: 3,
  },
  details: {
    flex: 1,
    // alignItems: 'center',
  },
  restaurantNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: constants.FONT_SMALL * 0.8,
    fontFamily: 'Nunito-Bold',
    // flexWrap: 'wrap',
    // lineHeight: 12,
  },
  // detailsText: {
  //   marginHorizontal: constants.MARGIN_X_SMALL,
  //   alignSelf: 'flex-start',
  // },
  box: {
    width: constants.WINDOW_WIDTH * 0.025,
    height: constants.WINDOW_WIDTH * 0.025,
    marginLeft: constants.MARGIN_X_SMALL * 2,
    marginRight: constants.MARGIN_X_SMALL,
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.1,
  },
  restaurantDetailsContainer: {
    marginLeft:
      constants.MARGIN_X_SMALL * 2 +
      constants.WINDOW_WIDTH * 0.025 +
      constants.MARGIN_X_SMALL,
  },
  type: {
    color: colors.GREY,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL,
    marginTop: -constants.MARGIN_VERTICAL_XSMALL * 0.4,
    borderColor: colors.GREY,
    borderBottomWidth: 0.5,
    paddingBottom: constants.PADDING_VERTICAL_MEDIUM * 0.2,
  },
  star: {
    width: constants.WINDOW_WIDTH * 0.025,
    height: constants.WINDOW_WIDTH * 0.025,
  },
  rating: {
    color: colors.GREY,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL * 0.8,
    marginHorizontal: constants.MARGIN_X_SMALL,
  },
  rightContainer: {
    alignItems: 'center',
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountIcon: {
    width: constants.WINDOW_WIDTH * 0.03,
    height: constants.WINDOW_WIDTH * 0.03,
  },
  discount: {
    color: colors.GREY,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 0.7,
    marginLeft: constants.MARGIN_X_SMALL,
  },
  heartContainer: {
    marginTop: constants.MARGIN_X_SMALL,
  },
});
