import {StyleSheet} from 'react-native';

import colors from '../../config/colors';
import constants from '../../config/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG_GREY,
    marginTop: 0,
  },
  content: {
    marginTop: constants.MARGIN_VERTICAL_SMALL,
  },
  categoryContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: constants.MARGIN_SMALL,
  },
  item: {
    marginLeft: constants.MARGIN_SMALL,
  },
});
