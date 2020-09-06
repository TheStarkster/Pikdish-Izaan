import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.LIGHTEST_GREY,
    flex: 1
  },
  bgImage: {
    width: constants.WINDOW_WIDTH * 0.95,
    height: constants.WINDOW_WIDTH * 0.55,
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: constants.MARGIN_MEDIUM,
  },
  bgWhite: {
    backgroundColor: colors.WHITE,
    marginTop: constants.MARGIN_LARGE,
    // marginBottom: constants.MARGIN_SMALL * 1.8,
  },
  miniContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  detailContainer: {
    flexDirection: 'row',
    marginTop: constants.MARGIN_SMALL * 0.8,
  },
  ticketContainer: {
    flex: 0.6,
  },
  seatContainer: {
    flex: 0.4,
  },
  detail: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
    marginHorizontal: constants.MARGIN_X_SMALL,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: constants.MARGIN_SMALL * 0.8,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT_GREY,
    borderStyle: 'solid',
    paddingBottom: constants.PADDING_MEDIUM * 1.5,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: constants.MARGIN_MEDIUM,
  },
  ticketsQuantityContainer: {
    flexDirection: 'row',
    alignItems: "center",
    flex: 1,
  },
  amountContainer: {
    flexDirection: 'row',
  },
  bottomContainerText: {
    fontFamily: 'Nunito-Regular',
    color: 'red',
    fontSize: constants.FONT_SMALL,
    marginHorizontal: constants.MARGIN_SMALL * 0.5,
  },
  outlineButton: {
    width: constants.WINDOW_WIDTH * 0.2,
    flex: 0,
  },
  button: {
    alignSelf: 'center',
    marginTop: constants.MARGIN_LARGE,
    marginBottom: constants.MARGIN_MEDIUM,
    width: constants.WINDOW_WIDTH * 0.6,
  },
});
