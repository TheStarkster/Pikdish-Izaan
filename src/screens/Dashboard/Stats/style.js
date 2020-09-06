import {StyleSheet} from 'react-native';

import constants from '../../../config/constants';
import colors from '../../../config/colors';

export default StyleSheet.create({
  statsMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statsBox: {
    width: constants.WINDOW_WIDTH * 0.44,
    height: constants.WINDOW_WIDTH * 0.5,
    backgroundColor: colors.WHITE,
    padding: constants.PADDING_MEDIUM * 0.5,
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    marginVertical: constants.MARGIN_MEDIUM,
  },
  img: {
    width: constants.WINDOW_WIDTH * 0.09,
    height: constants.WINDOW_WIDTH * 0.06,
    alignSelf: 'flex-end',
  },
  number: {
    color: colors.RED,
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_MEDIUM * 1.5,
    textAlign: 'center',
  },
  text: {
    color: colors.RED,
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL,
    textAlign: 'center',
  },
  miniContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});
