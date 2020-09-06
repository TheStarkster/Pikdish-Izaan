import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    marginVertical: constants.MARGIN_VERTICAL_XSMALL,
    backgroundColor: colors.WHITE,
    paddingHorizontal: constants.PADDING_SMALL,
    paddingBottom: constants.PADDING_VERTICAL_MEDIUM * 0.6,
  },
  heading: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
    // marginLeft: constants.MARGIN_SMALL * 1.4,
  },
});
