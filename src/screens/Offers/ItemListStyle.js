import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    // alignItems: 'center',
    height: constants.WINDOW_HEIGHT * 0.1,
    marginVertical: constants.MARGIN_VERTICAL_XSMALL,
    paddingLeft: constants.WINDOW_WIDTH * 0.05,
    paddingRight: constants.WINDOW_WIDTH * 0.05,
  },
  image: {
    width: constants.WINDOW_WIDTH * 0.18,
    height: constants.WINDOW_WIDTH * 0.18,
    borderRadius: constants.WINDOW_WIDTH * 0.05,
    marginRight: constants.WINDOW_WIDTH * 0.01,
  },
  details: {
    flex: 1,
    marginRight: constants.MARGIN_SMALL,
  },
  restaurantNameContainer: {
    flexDirection: 'row',
    // backgroundColor: "red",
    alignItems: 'flex-start',
  },
  restaurantName: {
    paddingTop: 0,
    marginTop: -constants.WINDOW_HEIGHT * 0.01,
    // backgroundColor: "yellow",
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    // includeFontPadding: false,
    // fontSize: constants.FONT_SMALL,
    marginBottom: constants.MARGIN_VERTICAL_XSMALL * 0.5,
    fontFamily: 'Nunito-Bold',
    // flexWrap: 'wrap',
    // lineHeight: 15,
  },
  // detailsText: {
  //   marginTop: -constants.MARGIN_VERTICAL_XSMALL * 0.5,
  //   marginHorizontal: constants.MARGIN_X_SMALL,
  //   alignSelf: 'flex-start',
  // },
  detailsContainer: {
    marginLeft: constants.WINDOW_WIDTH * 0.025 + constants.MARGIN_X_SMALL,
  },
  type: {
    color: colors.RED,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL,
    marginTop: -constants.MARGIN_VERTICAL_XSMALL * 0.5,
    borderColor: colors.GREY,
    borderBottomWidth: 0.5,
    paddingBottom: constants.PADDING_VERTICAL_MEDIUM * 0.35,
  },
  star: {
    width: constants.WINDOW_WIDTH * 0.025,
    height: constants.WINDOW_WIDTH * 0.025,
  },
  rating: {
    color: colors.GREY,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL * 0.9,
    marginHorizontal: constants.MARGIN_X_SMALL * 0.4,
  },
  rightContainer: {
    justifyContent: 'center',
    // paddingHorizontal: constants.PADDING_SMALL,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountIcon: {
    width: constants.WINDOW_WIDTH * 0.04,
    height: constants.WINDOW_WIDTH * 0.04,
  },
  discount: {
    color: colors.RED,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 0.8,
    marginLeft: constants.MARGIN_X_SMALL,
  },
  heartContainer: {
    marginTop: constants.MARGIN_X_SMALL,
  },
  circle: {
    // marginTop: constants.MARGIN_VERTICAL_XSMALL,
    marginRight: constants.MARGIN_X_SMALL,
    width: constants.WINDOW_WIDTH * 0.025,
    height: constants.WINDOW_WIDTH * 0.025,
  },
});
