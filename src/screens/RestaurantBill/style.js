import {StyleSheet} from 'react-native';

import constants from '../../config/constants';

export default StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: constants.MARGIN_VERTICAL_SMALL * 1.3,
  },
  item: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  amount: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
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
