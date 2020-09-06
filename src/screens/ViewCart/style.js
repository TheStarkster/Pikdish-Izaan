import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';
import GeneralStyle from '../GeneralStyle';

export default StyleSheet.create({
  header: {
    backgroundColor: colors.LIGHTEST_GREY,
  },
  restaurantDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantIcon: {
    width: constants.WINDOW_WIDTH * 0.2,
    height: constants.WINDOW_WIDTH * 0.2,
  },
  greenBoxIcon: {
    alignSelf: 'flex-start',
    width: constants.WINDOW_WIDTH * 0.03,
    height: constants.WINDOW_WIDTH * 0.03,
    marginLeft: constants.MARGIN_SMALL,
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.7,
  },
  restaurantNameDetails: {
    alignSelf: 'flex-start',
    marginLeft: constants.MARGIN_SMALL,
  },
  restaurantName: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL,
  },
  foodCategory: {
    color: colors.GREY,
    fontSize: constants.FONT_X_SMALL,
    fontFamily: 'Nunito-Regular',
    marginTop: -constants.MARGIN_VERTICAL_XSMALL * 0.1,
    paddingBottom: constants.PADDING_VERTICAL_MEDIUM * 0.7,
    borderColor: colors.GREY,
    borderBottomWidth: 0.5,
  },
  ratingContainer: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: constants.WINDOW_WIDTH * 0.03,
    height: constants.WINDOW_WIDTH * 0.03,
    marginRight: constants.MARGIN_SMALL * 0.6,
  },
  dotIcon: {
    width: constants.WINDOW_WIDTH * 0.015,
    height: constants.WINDOW_WIDTH * 0.015,
    marginHorizontal: constants.MARGIN_SMALL * 0.6,
  },
  itemContainer: {
    borderColor: colors.GREY,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingTop: constants.PADDING_VERTICAL_MEDIUM * 0.3,
    paddingBottom: constants.PADDING_VERTICAL_MEDIUM * 0.5,
    // marginTop: constants.MARGIN_VERTICAL_MEDIUM,
  },
  noteContainer: {
    borderColor: colors.GREY,
    borderBottomWidth: 1,
  },
  note: {
    fontFamily: 'Nunito-Bold',
    marginLeft: constants.MARGIN_X_SMALL,
  },
  applyCouponContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: constants.WINDOW_HEIGHT * 0.07,
    alignItems: 'center',
    paddingHorizontal: constants.PADDING_MEDIUM,
    ...GeneralStyle.mediumMarginTop,
  },
  discountIcon: {
    width: constants.WINDOW_WIDTH * 0.06,
    height: constants.WINDOW_WIDTH * 0.06,
  },
  applyText: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
    marginLeft: constants.MARGIN_SMALL,
    flex: 1,
  },
  arrowIcon: {
    width: constants.WINDOW_WIDTH * 0.035,
    height: constants.WINDOW_WIDTH * 0.035,
  },
  billContainer: {
    marginVertical: constants.MARGIN_SMALL,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  billDetails: {
    flex: 1,
    marginLeft: constants.MARGIN_MEDIUM,
  },
  bill: {
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Regular',
  },
  detailBill: {
    marginTop: -constants.MARGIN_SMALL * 0.5,
    fontSize: constants.FONT_SMALL,
    color: colors.RED,
    fontFamily: 'Nunito-Regular',
  },
  tipContainer: {
    marginTop: constants.MARGIN_SMALL,
    paddingHorizontal: constants.PADDING_SMALL,
    paddingVertical: constants.PADDING_SMALL * 0.6,
  },
  ngoContainer: {
    marginTop: constants.MARGIN_SMALL,
    paddingHorizontal: constants.PADDING_SMALL,
    backgroundColor: 'white',
    paddingVertical: constants.PADDING_MEDIUM,
  },
  tipText: {
    marginTop: -constants.MARGIN_VERTICAL_XSMALL * 0.5,
    marginLeft: constants.MARGIN_SMALL,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  radioContainer: {
    marginTop: constants.MARGIN_SMALL,
    flexDirection: 'row',
    paddingHorizontal: constants.PADDING_MEDIUM * 1.4,
    justifyContent: 'space-between',
  },
  radio: {
    // marginHorizontal: constants.MARGIN_SMALL
  },
});
