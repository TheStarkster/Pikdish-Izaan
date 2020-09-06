import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

const styles = StyleSheet.create({
  bookingPageContainer: {
    backgroundColor: colors.LIGHTEST_GREY,
    height: '100%',
  },
  restaurantDetailsHeader: {
    paddingHorizontal: constants.PADDING_SMALL,
  },
  bookingPageImage: {
    width: constants.WINDOW_WIDTH * 0.29,
    height: constants.WINDOW_WIDTH * 0.24,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: constants.MARGIN_X_SMALL,
  },
  miniContainer: {
    marginLeft: constants.MARGIN_SMALL * 1.2,
  },
  restaurantName: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL * 1.4,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY,
    borderStyle: 'solid',
    paddingBottom: constants.PADDING_X_SMALL,
  },
  starIcon: {
    color: colors.GREY,
  },
  rating: {
    marginLeft: constants.MARGIN_X_SMALL,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  dotIcon: {
    fontSize: constants.FONT_SMALL * 1.2,
    color: colors.GREY,
  },
  greenCircle: {
    marginRight: constants.MARGIN_X_SMALL,
  },
  time: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  bookingSectionContainer: {
    // borderTopWidth: 1,
    // borderTopColor: colors.GREY,
    // borderStyle: 'solid',
  },
  pickerContainer: {
    backgroundColor: colors.WHITE,
    marginTop: 10,
    borderRadius: 5,
  },
  arrowDownIconContainer: {
    height: constants.WINDOW_WIDTH * 0.15,
    justifyContent: 'center',
    right: 20,
  },
  arrowDownIcon: {
    fontSize: constants.FONT_SMALL * 1.5,
  },
  tablesContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: constants.PADDING_X_SMALL,
    padding: constants.PADDING_SMALL * 0.3,
  },
  tablesMiniContainer: {
    backgroundColor: colors.WHITE,
    paddingVertical: constants.PADDING_X_SMALL,
    width: constants.WINDOW_WIDTH * 0.28,
    height: constants.WINDOW_WIDTH * 0.3,
    borderRadius: 30,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  remainingTime: {
    textAlign: 'center',
    color: colors.RED,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  tableNo: {
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  cost: {
    textAlign: 'center',
    color: colors.RED,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 1.3,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: 'black',
    height: constants.WINDOW_WIDTH * 0.15,
  },
  inputAndroid: {
    color: 'black',
    height: constants.WINDOW_WIDTH * 0.15,
  },
});

export {pickerSelectStyles, styles};
