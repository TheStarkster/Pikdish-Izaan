import {StyleSheet} from 'react-native';

import constants from '../../config/constants';

export default StyleSheet.create({
  exploreContainer: {
    marginVertical: constants.MARGIN_VERTICAL_SMALL,
  },
  explore: {
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL * 1.2,
  },
  poweredByText: {
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
});
