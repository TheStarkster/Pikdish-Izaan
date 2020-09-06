import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  logo: {
    height: constants.WINDOW_HEIGHT * 0.07,
    width: constants.WINDOW_WIDTH * 0.65,
    borderRadius: 20,
    marginVertical: constants.MARGIN_VERTICAL_XSMALL,
  },
  content: {
    marginTop: constants.MARGIN_LARGE * 0.5,
  },
  feedbackHeading: {
    fontSize: constants.FONT_SMALL * 1.5,
    fontFamily: 'Nunito-Bold',
  },
  feedbackMessage: {
    fontSize: constants.FONT_SMALL * 0.85,
    fontFamily: 'Nunito-Regular',
  },
  feedbackInputContainer: {
    marginTop: constants.MARGIN_SMALL * 1.5,
    backgroundColor: 'white',
    width: '100%',
    height: constants.WINDOW_HEIGHT * 0.35,
    paddingHorizontal: constants.PADDING_MEDIUM,
    paddingVertical: constants.PADDING_VERTICAL_MEDIUM * 0.5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: constants.MARGIN_SMALL,
  },
  button: {
    width: '70%',
  },
});
