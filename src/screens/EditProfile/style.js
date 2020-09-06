import {StyleSheet} from 'react-native';

import constants from '../../config/constants';

export default StyleSheet.create({
  container: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
  },
  editProfileText: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 1.3,
  },
  rightArrowIcon: {
    width: constants.WINDOW_WIDTH * 0.04,
    height: constants.WINDOW_WIDTH * 0.04,
  },
  form: {
    // marginVertical: constants.MARGIN_VERTICAL_XSMALL,
  },
  input: {
    // marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.4,
  },
  avatar: {
    width: constants.WINDOW_WIDTH * 0.27,
    height: constants.WINDOW_WIDTH * 0.27,
  },
  saveButtonContainer: {
    paddingHorizontal: constants.PADDING_MEDIUM,
  },
  saveButton: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
    width: '100%',
  },
  datePicker: {
    width: 0,
    height: 0,
  },
});
