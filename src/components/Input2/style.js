import {StyleSheet} from 'react-native';
import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: constants.WINDOW_HEIGHT * 0.06,
    marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.5,
  },
  label: {
    width: constants.WINDOW_WIDTH * 0.3,
    fontFamily: 'Nunito-Light',
    fontSize: constants.FONT_SMALL,
  },
  textInput: {
    backgroundColor: colors.WHITE,
    flex: 1,
    height: '100%',
    paddingHorizontal: constants.PADDING_SMALL,
    fontFamily: 'Nunito-Light',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,

    elevation: 1,
    borderRadius: 2,
  },
});
