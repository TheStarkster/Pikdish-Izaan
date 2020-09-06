import {StyleSheet} from 'react-native';

import colors from '../../../../config/colors';
import constants from '../../../../config/constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: constants.WINDOW_WIDTH * 0.06,
    height: constants.WINDOW_WIDTH * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: (constants.WINDOW_WIDTH * 0.06) / 2,
  },
  tickIcon: {
    width: 14,
    height: 14,
  },
  amount: {
    color: colors.GREY,
    marginLeft: constants.MARGIN_SMALL,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  label: {
    marginTop: -constants.MARGIN_VERTICAL_XSMALL * 0.5,
    marginLeft: constants.MARGIN_SMALL,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  checkboxCircle: {
    borderRadius: 100,
    color: 'white',
  },
  checkboxValue: {
    marginLeft: constants.MARGIN_SMALL,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  selectedBox: {
    backgroundColor: colors.RED,
  },
  unSelectedBox: {
    backgroundColor: colors.LIGHT_BLACK,
  },
  selectedBox: {
    backgroundColor: colors.RED,
  },
});
