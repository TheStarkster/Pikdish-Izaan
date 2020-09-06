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
  headingContainer: {
    paddingTop: constants.MARGIN_VERTICAL_SMALL,
    paddingBottom: constants.MARGIN_VERTICAL_XSMALL,
    borderColor: colors.GREY,
    borderBottomWidth: 0.5,
  },
  heading: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_MEDIUM,
  },
  itemContainer: {
    paddingHorizontal: constants.PADDING_SMALL,
  },
  noteContainer: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
  },
  note: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL,
  },
  feedbackInputContainer: {
    marginTop: constants.MARGIN_SMALL,
    backgroundColor: 'white',
    width: '100%',
    height: constants.WINDOW_HEIGHT * 0.15,
    paddingHorizontal: constants.PADDING_SMALL,
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
});
