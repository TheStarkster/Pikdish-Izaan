import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  // header: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginHorizontal: constants.PADDING_MEDIUM,
  //   paddingVertical: constants.PADDING_SMALL * 1.2,
  //   borderColor: colors.GREY,
  //   borderBottomWidth: 1,
  // },
  // headerRestaurantName: {
  //   fontSize: constants.FONT_SMALL * 1.2,
  //   fontFamily: 'Nunito-Regular',
  // },
  // headerAddress: {
  //   marginTop: -constants.MARGIN_VERTICAL_XSMALL * 0.5,
  //   fontSize: constants.FONT_SMALL,
  //   fontFamily: 'Nunito-Regular',
  //   // lineHeight: 15,
  // },
  // headerPrice: {
  //   fontSize: constants.FONT_X_SMALL,
  //   fontFamily: 'Nunito-Regular',
  // },
  // headerLeft: {
  //   flex: 1,
  // },
  // headerRight: {
  //   flex: 1,
  //   alignItems: 'flex-end',
  // },
  starIcon: {
    width: constants.WINDOW_WIDTH * 0.04,
    color: colors.BROWN,
  },
  // headerRating: {
  //   fontFamily: 'Nunito-Regular',
  //   color: colors.BROWN,
  //   marginLeft: constants.MARGIN_SMALL * 0.7,
  // },
  // headerRatingCount: {
  //   fontFamily: 'Nunito-Regular',
  //   fontSize: constants.FONT_X_SMALL,
  //   lineHeight: 15,
  // },
  ratingContainer: {
    marginTop: constants.MARGIN_VERTICAL_SMALL * 0.5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewIcon: {
    // width: constants.WINDOW_WIDTH * 0.07,
    width: constants.WINDOW_WIDTH * 0.06,
    height: "60%",
  },
  reviewText: {
    fontFamily: 'Nunito-Light',
    fontSize: constants.FONT_SMALL * 1.4,
    marginLeft: constants.MARGIN_SMALL,
  },
  reviewContainer: {
    paddingVertical: constants.PADDING_VERTICAL_MEDIUM * 1.3,
    borderColor: colors.GREY,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 1.4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  review: {
    flex: 0.7,
    paddingLeft: constants.PADDING_SMALL * 1.4,
  },
  ratingRedBox: {
    backgroundColor: colors.RED,
    width: constants.WINDOW_WIDTH * 0.2,
    height: constants.WINDOW_WIDTH * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingAverageText: {
    color: colors.WHITE,
    fontFamily: 'Nunito-Bold',
    // lineHeight: 15,
    fontSize: constants.FONT_SMALL * 1.3,
  },
  ratingNumber: {
    fontSize: constants.FONT_SMALL * 0.8,
    fontFamily: 'Nunito-Regular',
    marginTop: constants.MARGIN_X_SMALL,
  },
  reviewNumber: {
    fontSize: constants.FONT_SMALL * 0.7,
    fontFamily: 'Nunito-Regular',
  },
  reviewSectionContainer: {
    paddingVertical: constants.PADDING_VERTICAL_MEDIUM * 1.3,
    borderColor: colors.GREY,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewSectionText: {
    fontSize: constants.FONT_SMALL * 1.2,
    fontFamily: 'Nunito-Bold',
    lineHeight: 20,
  },
  featureContainer: {
    marginTop: constants.MARGIN_VERTICAL_MEDIUM,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreIcon: {
    width: constants.WINDOW_WIDTH * 0.07,
    height: constants.WINDOW_WIDTH * 0.07,
  },
  featuresHeading: {
    marginLeft: constants.MARGIN_SMALL,
    fontSize: constants.FONT_SMALL * 1.2,
    fontFamily: 'Nunito-Bold',
  },
  featureListContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: constants.MARGIN_SMALL * 1.5,
  },
  featureListLeft: {
    borderColor: colors.GREY,
    borderRightWidth: 1,
    paddingBottom: constants.PADDING_VERTICAL_MEDIUM * 0.5,
    paddingRight: constants.PADDING_SMALL * 1.3,
    flex: 1
  },
  featureListRight: {
    flex: 1
  }
});
