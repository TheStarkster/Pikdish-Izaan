import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  dashboardContainer: {
    backgroundColor: colors.LIGHTEST_GREY,
    height: '100%',
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabBarText: {
    marginHorizontal: constants.MARGIN_MEDIUM * 0.75,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 1.1,
  },
  borderLine: {
    borderBottomWidth: 1.3,
    borderBottomColor: colors.RED,
    borderStyle: 'solid',
    paddingBottom: constants.PADDING_SMALL,
  },
});
