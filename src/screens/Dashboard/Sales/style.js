import {StyleSheet} from 'react-native';

import GeneralStyle from '../../GeneralStyle';
import constants from '../../../config/constants';
import colors from '../../../config/colors';

export default StyleSheet.create({
  container: {
    ...GeneralStyle.container,
    ...GeneralStyle.noMarginTop,
  },
  graphContainer: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
  },
});
