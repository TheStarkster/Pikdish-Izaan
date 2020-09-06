import {StyleSheet} from 'react-native';

import colors from '../../config/colors';
import constants from '../../config/constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: constants.WINDOW_WIDTH * 0.06,
    height: constants.WINDOW_WIDTH * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.4
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
    backgroundColor: colors.WHITE,
    borderColor: colors.BLACK,
    borderWidth: 0.5
  },
});
