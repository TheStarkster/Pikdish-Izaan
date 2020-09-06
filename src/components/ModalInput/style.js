import {StyleSheet} from 'react-native';

import colors from '../../config/colors';
import constants from '../../config/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.OVERLAY_COLOR,
    flex: 1,
    justifyContent: 'flex-end',
  },
  boxContainer: {
    flex: 0.45,
    backgroundColor: 'white',
    paddingHorizontal: constants.PADDING_MEDIUM,
  },
  headingContainer: {
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.LIGHT_GREY,
    borderBottomWidth: 1,
  },
  inputContainer: {
    marginTop: constants.MARGIN_LARGE,
    alignItems: "center"
  },
  heading: {
    fontSize: constants.FONT_SMALL,
    fontWeight: 'bold',
  },
});
