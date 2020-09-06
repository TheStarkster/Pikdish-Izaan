import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    paddingBottom: constants.PADDING_SMALL,
    marginHorizontal: constants.MARGIN_SMALL
  },
  tabText: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL * 1.5,
  },
  active: {
    borderColor: colors.RED,
    borderBottomWidth: 1,
  },
});
