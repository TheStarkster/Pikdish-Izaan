import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.LIGHTEST_GREY,
    height: '100%',
  },
  restaurantDetailsContainer: {
    backgroundColor: colors.WHITE,
  },
  greenCircle: {
    marginRight: constants.MARGIN_SMALL * 0.5,
    width: constants.WINDOW_WIDTH * 0.025,
    height: constants.WINDOW_WIDTH * 0.025,
  },
  restaurantName: {
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Bold',
  },
  restaurantDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDetails: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 0.8,
    marginTop: constants.MARGIN_X_SMALL,
  },
  itemDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.80,
    paddingHorizontal: constants.PADDING_MEDIUM * 0.8,
    paddingBottom: constants.PADDING_SMALL,
  },
  itemName: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  miniContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    color: colors.GREY,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 0.8,
    marginLeft: constants.MARGIN_MEDIUM,
  },
  itemAmount: {
    fontFamily: 'Nunito-Light',
    fontSize: constants.FONT_SMALL,
  },
  bgWhite: {
    backgroundColor: colors.WHITE,
    marginTop: constants.MARGIN_SMALL,
  },
  totalItemContainer: {
    marginTop: constants.MARGIN_SMALL,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 0.8,
    color: colors.DARK_GREY,
  },
  discount1Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: constants.MARGIN_X_SMALL,
  },
  discount2Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: constants.MARGIN_X_SMALL,
  },
  taxMainContainer: {
    marginVertical: constants.MARGIN_VERTICAL_XSMALL,
  },
  taxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  packingChargesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deliveryChargesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: constants.MARGIN_SMALL * 1.4,
    // marginBottom: constants.MARGIN_MEDIUM * 1.5,
  },
  grandTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.RED,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: constants.PADDING_SMALL,
  },
  grandTotal: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL,
    color: colors.WHITE,
  },
});
