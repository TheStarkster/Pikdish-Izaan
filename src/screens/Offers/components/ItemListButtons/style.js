import {StyleSheet} from 'react-native';

import colors from '../../../../config/colors';
import constants from '../../../../config/constants';

const style = StyleSheet.create({
  container: {
    marginTop: 0,
    minHeight: 50,
    backgroundColor: colors.WHITE,
    paddingHorizontal: constants.PADDING_X_SMALL,
    flexDirection: 'row',
    // marginBottom: constants.MARGIN_VERTICAL_XSMALL
  },
  button: {marginTop: 0, marginBottom: 10, flex: 1, marginHorizontal: 2},
});

export default style;