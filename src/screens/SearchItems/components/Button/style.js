import {StyleSheet} from 'react-native';

import colors from '../../../../config/colors';
import constants from '../../../../config/constants';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GREY,
    borderWidth: 1,
    borderRadius: 30,
    marginHorizontal: constants.MARGIN_X_SMALL,
  },
  label: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL_FIXED,
  },
});

export default style;
