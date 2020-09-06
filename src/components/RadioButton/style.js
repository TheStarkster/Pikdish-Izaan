import {StyleSheet} from 'react-native';

import colors from '../../config/colors';
import constants from '../../config/constants';

export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.5,
    alignItems: 'center',
  },
  container: {
    height: 18,
    width: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.RED,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    height: 9,
    width: 9,
    borderRadius: 6,
    backgroundColor: colors.RED,
  },
  selectedContainer: {
    borderColor: colors.RED,
  },
  label: {
    marginTop: -constants.MARGIN_VERTICAL_XSMALL * 0.4,
    marginLeft: constants.MARGIN_SMALL,
    fontSize: constants.FONT_SMALL * 1,
    fontFamily: 'Nunito-Regular',
  },
});
