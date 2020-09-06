import {StyleSheet} from 'react-native';

import GeneralStyle from '../GeneralStyle';
import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    // backgroundColor: colors.LIGHTEST_GREY,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: constants.PADDING_MEDIUM * 0.9,
  },
  button: {
    width: constants.WINDOW_WIDTH * 0.3,
    height: constants.WINDOW_HEIGHT * 0.05,
    flex: 0
  },
  orderContainer: {
    flex: 1,
  },
  vegIcon: {
    width: constants.WINDOW_WIDTH * 0.025,
    height: constants.WINDOW_WIDTH * 0.025,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: constants.MARGIN_VERTICAL_SMALL * 0.7,
  },
  restaurantIcon: {
    width: constants.WINDOW_WIDTH * 0.16,
    height: constants.WINDOW_WIDTH * 0.16,
    marginRight: 7,
    borderRadius: 15
  },
  headerLeftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downArrow: {
    width: constants.WINDOW_WIDTH * 0.04,
    height: constants.WINDOW_WIDTH * 0.04,
  },
  greenCircle: {
    marginRight: constants.MARGIN_SMALL * 0.5,
  },
  text: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL,
  },
  bottomText: {
    color: colors.GREY,
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL * 1.1,
    // marginLeft: constants.MARGIN_MEDIUM,
  },
  categoryContainerStyles: {
    // ...GeneralStyle.boxBorder,
    ...GeneralStyle.boxShadow,
    backgroundColor: 'white',
    paddingRight: constants.PADDING_SMALL,
    paddingLeft: constants.PADDING_SMALL * 0.3,
    paddingTop: constants.PADDING_X_SMALL * 0.3,
    paddingBottom: constants.PADDING_X_SMALL * 0.7,
    marginVertical: constants.MARGIN_VERTICAL_XSMALL,
  },
  // Body Styles

  bodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.LIGHT_GREY,
    borderStyle: 'solid',
  },
  miniContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: constants.MARGIN_SMALL,
  },
  itemQuantity: {
    color: colors.GREY,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 0.8,
    marginLeft: constants.MARGIN_MEDIUM,
  },
  itemName: {
    fontFamily: 'Nunito-Light',
    fontSize: constants.FONT_SMALL,
    marginLeft: constants.MARGIN_SMALL,
  },
  itemAmount: {
    fontFamily: 'Nunito-Light',
    fontSize: constants.FONT_SMALL,
  },
  repeatText: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
    color: colors.RED,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
    justifyContent: 'space-between',
  },
});
