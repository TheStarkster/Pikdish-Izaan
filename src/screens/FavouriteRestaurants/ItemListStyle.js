import {StyleSheet, Platform} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  mainContainer: {
    marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.6,
  },
  premiumContainer: {
    width: constants.WINDOW_WIDTH * 0.18,
    // paddingVertical: constants.PADDING_VERTICAL_MEDIUM * 0.01,
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL * 0.8,
    color: colors.WHITE,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  container: {
    flexDirection: 'row',
    // alignItems: 'center',
    // minHeight: constants.WINDOW_HEIGHT * 0.12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingRight: constants.PADDING_MEDIUM * 0.4,
    paddingLeft: 5,
    paddingVertical: 5,
    // position: "relative"
    // marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.6,
  },
  premiumContainerMain: {
    width: constants.WINDOW_WIDTH * 0.18,
    // paddingVertical: constants.PADDING_VERTICAL_MEDIUM * 0.01,
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 10,
    borderRadius: (constants.WINDOW_WIDTH * 0.18) / 2,
  },
  premiumContainer: {
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL * 0.8,
    color: colors.WHITE,
  },
  image: {
    width: constants.WINDOW_WIDTH * 0.18,
    height: constants.WINDOW_WIDTH * 0.18,
    borderRadius: constants.WINDOW_WIDTH * 0.05,
    // marginLeft: constants.PADDING_MEDIUM * 0.4
  },
  hhIcon: {
    width: constants.WINDOW_WIDTH * 0.1,
    height: constants.WINDOW_WIDTH * 0.07,
    marginBottom: 5,
  },
  details: {
    flex: 1,
    // marginLeft: constants.MARGIN_SMALL
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
    // marginTop: constants.MARGIN_VERTICAL_XSMALL,
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
    marginTop:
      Platform.OS === 'ios'
        ? -constants.MARGIN_VERTICAL_XSMALL * 0.05
        : -constants.MARGIN_VERTICAL_XSMALL * 0.5,
    // borderColor: colors.GREY,
    // borderBottomWidth: 0.5,
    paddingBottom: constants.PADDING_VERTICAL_MEDIUM * 0.04,
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
    justifyContent: 'center',
    paddingLeft: 5,
    width: constants.WINDOW_WIDTH * 0.12,
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
    color: colors.YELLOW,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 0.7,
    // marginLeft: constants.MARGIN_X_SMALL,
  },
  heartContainer: {
    // marginTop: constants.MARGIN_X_SMALL,
  },
  closeText: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL_FIXED * 0.8,
    marginBottom: 5,
    color: colors.GREY,
  },
});
