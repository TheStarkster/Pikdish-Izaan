import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.LIGHTEST_GREY,
    flex: 1,
    paddingHorizontal: constants.PADDING_SMALL,
    // marginTop: constants.MARGIN_VERTICAL_XSMALL * 2,
  },
  bookingHeading: {
    fontSize: constants.FONT_MEDIUM * 0.7,
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    marginVertical: constants.MARGIN_VERTICAL_SMALL * 0.6,
  }
});
