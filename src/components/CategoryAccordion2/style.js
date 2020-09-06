import {StyleSheet} from 'react-native';

import GeneralStyle from '../../screens/GeneralStyle';
import constants from '../../config/constants';

export default StyleSheet.create({
  container: {
    ...GeneralStyle.boxBorder,
    paddingHorizontal: constants.PADDING_SMALL,
    paddingVertical: constants.PADDING_SMALL,
    marginVertical: constants.MARGIN_VERTICAL_XSMALL
  },
});
