import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  // restaurantDetails: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderColor: colors.GREY,
  //   borderBottomWidth: 0.5,
  //   paddingBottom: constants.PADDING_MEDIUM,
  // },
  // cuisine: {
  //   color: colors.BLACK,
  //   fontFamily: 'Nunito-Regular',
  //   fontSize: constants.FONT_X_SMALL,
  //   // borderBottomColor: colors.GREY,
  //   // borderBottomWidth: 0.5,
  //   marginTop: -constants.MARGIN_VERTICAL_XSMALL * 0.3,
  //   paddingBottom: constants.PADDING_VERTICAL_MEDIUM * 0.3,
  // },
  // line: {
  //   borderBottomColor: colors.GREY,
  //   borderBottomWidth: 0.5,
  // },
  pureVeg: {
    width: constants.WINDOW_WIDTH * 0.035,
    height: constants.WINDOW_WIDTH * 0.035,
  },
  // restaurantImage: {
  //   width: constants.WINDOW_WIDTH * 0.3,
  //   height: constants.WINDOW_WIDTH * 0.2,
  // },
  hhIcon: {
    width: constants.WINDOW_WIDTH * 0.2,
    height: constants.WINDOW_WIDTH * 0.1,
  },
  discountLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL,
    color: colors.YELLOW,
  },
  // restaurantImageAfter: {
  //   marginLeft: constants.MARGIN_SMALL,
  //   marginRight: constants.MARGIN_LARGE,
  //   flex: 1
  // },
  // restaurantName: {
  //   fontSize: constants.FONT_SMALL * 1.2,
  //   fontFamily: 'Nunito-Bold',
  // },
  // star: {
  //   width: constants.WINDOW_WIDTH * 0.04,
  //   height: constants.WINDOW_WIDTH * 0.04,
  // },
  // rating: {
  //   marginLeft: constants.MARGIN_SMALL * 0.3,
  //   fontSize: constants.FONT_SMALL * 0.9,
  //   fontFamily: 'Nunito-Regular',
  // },
  // dot: {
  //   marginLeft: constants.MARGIN_SMALL * 0.6,
  //   width: constants.WINDOW_WIDTH * 0.015,
  //   height: constants.WINDOW_WIDTH * 0.015,
  // },
  // time: {
  //   marginLeft: constants.MARGIN_SMALL * 0.6,
  //   fontSize: constants.FONT_SMALL * 0.9,
  //   fontFamily: 'Nunito-Regular',
  // },
  greenBox: {
    marginLeft: constants.MARGIN_SMALL * 0.6,
    width: constants.WINDOW_WIDTH * 0.04,
    height: constants.WINDOW_WIDTH * 0.04,
    borderColor: 'green',
    borderWidth: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenCircle: {
    width: constants.WINDOW_WIDTH * 0.02,
    height: constants.WINDOW_WIDTH * 0.02,
    backgroundColor: 'green',
    borderRadius: (constants.WINDOW_WIDTH * 0.02) / 2,
  },
  redBox: {
    marginLeft: constants.MARGIN_SMALL * 0.6,
    width: constants.WINDOW_WIDTH * 0.04,
    height: constants.WINDOW_WIDTH * 0.04,
    borderColor: 'red',
    borderWidth: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redCircle: {
    width: constants.WINDOW_WIDTH * 0.02,
    height: constants.WINDOW_WIDTH * 0.02,
    backgroundColor: 'red',
    borderRadius: (constants.WINDOW_WIDTH * 0.02) / 2,
  },
  veg: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL * 0.8,
    // marginRight: constants.MARGIN_SMALL
  },
  categoryHeading: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_MEDIUM * 0.7,
    // marginVertical: constants.MARGIN_VERTICAL_XSMALL,
  },
  menuContainer: {
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: constants.WINDOW_HEIGHT * 0.12,
  },
  menuIcon: {
    width: constants.WINDOW_WIDTH * 0.24,
    height: constants.WINDOW_WIDTH * 0.15,
  },

  // RestaurantItemsModal Styles
  RestaurantItemsModalContainer: {
    backgroundColor: colors.OVERLAY_COLOR,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  RestaurantItemsModalbox: {
    backgroundColor: 'white',
    width: constants.WINDOW_WIDTH * 0.7,
    marginBottom: constants.MARGIN_XLARGE * 1.3,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  RestaurantItemsModalHeader: {
    paddingHorizontal: constants.PADDING_MEDIUM,
    paddingVertical: constants.PADDING_SMALL,
    alignItems: 'flex-end',
  },
  RestaurantItemsModalContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: constants.PADDING_MEDIUM,
    paddingTop: constants.PADDING_MEDIUM,
  },
  checkIconContainer: {
    width: 20,
  },
  checkIcon: {
    color: colors.RED,
  },
  text: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
    paddingLeft: constants.PADDING_SMALL,
  },
  number: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  paddingBottom: {
    paddingBottom: constants.PADDING_MEDIUM * 2,
  },
});
