import {StyleSheet} from 'react-native';

import colors from '../../config/colors';
import constants from '../../config/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.OVERLAY_COLOR,
    flex: 1,
    justifyContent: 'center',
  },
  boxContainer: {
    marginHorizontal: constants.PADDING_MEDIUM,
    height: constants.WINDOW_HEIGHT * 0.5,
    backgroundColor: colors.WHITE,
    paddingHorizontal: constants.PADDING_MEDIUM,
  },
  heading: {
    fontSize: constants.FONT_MEDIUM * 0.9,
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
    color: colors.RED,
  },
  message: {
    fontSize: constants.FONT_SMALL * 1.1,
    lineHeight: constants.FONT_SMALL * 1.3,
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
    marginVertical: constants.MARGIN_X_SMALL,
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonLeft: {
    marginRight: constants.MARGIN_X_SMALL,
  },
  button: {
    marginTop: 0,
    flex: 1,
    marginBottom: constants.MARGIN_VERTICAL_SMALL,
  },
});
