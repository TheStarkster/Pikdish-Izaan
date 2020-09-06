import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: constants.PADDING_VERTICAL_MEDIUM,
    paddingHorizontal: constants.PADDING_MEDIUM,
  },
  heading: {
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Bold',
    paddingHorizontal: constants.PADDING_SMALL,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: constants.MARGIN_X_SMALL * 1.5,
    paddingHorizontal: constants.PADDING_SMALL,
  },
  listItem: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL * 1.1,
  },
  deliveryContainer: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
    borderColor: colors.GREY,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  messageContainer: {
    marginTop: constants.MARGIN_SMALL,
    borderColor: colors.GREY,
    borderWidth: 1,
    padding: constants.PADDING_SMALL,
  },
  message: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
});
