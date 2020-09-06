import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import GeneralStyle from '../GeneralStyle';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: 'white',
  },
  topContainer: {
    ...GeneralStyle.container,
    marginTop: 0,
  },
  balanceContainer: {
    height: constants.WINDOW_HEIGHT * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceTitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 1.3,
    color: colors.DARK_GREY,
  },
  balance: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 1.3,
  },
  listContainer: {
    borderTopWidth: 0,
  },
  secondContainer: {
    backgroundColor: colors.BG_GREY,
  },
  thirdContainer: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
    marginHorizontal: constants.MARGIN_SMALL
  },
});
