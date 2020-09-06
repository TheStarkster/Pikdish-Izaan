import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  offersContainer: {
    // height: constants.WINDOW_HEIGHT,
    flex: 1,
    // marginBottom: constants.MARGIN_VERTICAL_SMALL,
  },
  offersTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: constants.WINDOW_WIDTH * 0.025,
    paddingRight: constants.WINDOW_WIDTH * 0.025,
    // marginTop: constants.MARGIN_VERTICAL_SMALL,
  },
  noCouponContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCouponText: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_MEDIUM * 0.7,
  },
  offersCoupanBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coupanText: {
    paddingLeft: constants.WINDOW_WIDTH * 0.02,
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_X_SMALL * 1.25,
    paddingBottom: constants.PADDING_X_SMALL,
  },
  restaurantOffers: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_X_SMALL * 1.25,
    paddingBottom: constants.PADDING_X_SMALL,
  },
  activeTab: {
    borderBottomColor: colors.RED,
    borderBottomWidth: 1,
  },
  borderLineBox: {
    alignItems: 'flex-end',
  },
  borderLine: {
    borderTopWidth: 2,
    borderTopColor: 'red',
    borderStyle: 'solid',
    width: constants.WINDOW_WIDTH * 0.42,
    marginTop: constants.WINDOW_HEIGHT * 0.01,
  },
  borderLineLeft: {
    marginLeft: constants.WINDOW_WIDTH * 0.05,
  },
  borderLineRight: {
    marginRight: constants.WINDOW_WIDTH * 0.04,
  },

  // Coupans Screen style start

  coupansMainContainer: {
    backgroundColor: colors.WHITE,
    marginTop: constants.MARGIN_VERTICAL_MEDIUM,
    width: constants.WINDOW_WIDTH * 0.9,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    paddingVertical: constants.PADDING_SMALL,
  },
  coupansMiniContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: constants.WINDOW_WIDTH * 0.07,
    paddingRight: constants.WINDOW_WIDTH * 0.07,
    marginTop: constants.MARGIN_VERTICAL_SMALL,
  },
  buttonBox: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 5,
    borderColor: colors.GREY,
    alignItems: 'center',
    backgroundColor: colors.LIGHTEST_GREY,
  },
  paytmText: {
    paddingRight: constants.WINDOW_WIDTH * 0.03,
  },
  paytmIcon: {
    width: constants.WINDOW_WIDTH * 0.15,
    height: constants.WINDOW_WIDTH * 0.05,
    marginRight: constants.MARGIN_SMALL,
  },
  pmnewaprText: {
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Bold',
  },
  applyText: {
    color: colors.RED,
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL * 1.1,
  },
  coupanTextBox: {
    paddingLeft: constants.WINDOW_WIDTH * 0.07,
    paddingRight: constants.WINDOW_WIDTH * 0.07,
    marginTop: constants.MARGIN_VERTICAL_SMALL,
    marginBottom: constants.MARGIN_VERTICAL_SMALL,
  },
  coupansDiscText: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 1.1,
  },
  coupansDiscDetails: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
    color: colors.GREY,
  },
});
