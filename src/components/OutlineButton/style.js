import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  button: {
    borderWidth: 0.5,
    borderColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 3,
  },
  buttonText: {
    fontSize: constants.FONT_X_SMALL,
    color: colors.RED,
    fontFamily: 'Nunito-Bold',
  },
  container: {
    // paddingHorizontal: constants.PADDING_X_SMALL,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  substractIcon: {
    width: constants.WINDOW_WIDTH * 0.025,
    height: constants.WINDOW_WIDTH * 0.025,
  },
  number: {
    fontFamily: 'Nunito-Regular',
    color: colors.RED,
    marginTop: -constants.MARGIN_VERTICAL_XSMALL * 0.3,
    flex: 1,
    textAlign: "center"
  },
  customizedContainer: {
    // marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowDownIcon: {
    width: constants.WINDOW_WIDTH * 0.03,
    height: constants.WINDOW_WIDTH * 0.03,
    marginLeft: constants.MARGIN_X_SMALL,
  },
  customizedText: {
    color: colors.GREY,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL * 0.8,
  },
});
