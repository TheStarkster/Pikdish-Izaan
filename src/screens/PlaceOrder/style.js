import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';
import GeneralStyle from '../GeneralStyle';

export default StyleSheet.create({
  container: {
    ...GeneralStyle.container,
    marginTop: 0,
    flex: 1,
    justifyContent: 'center',
  },
  boxContainer: {
    minHeight: constants.WINDOW_HEIGHT * 0.45,
    paddingVertical: constants.MARGIN_VERTICAL_MEDIUM,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,

    elevation: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: constants.FONT_MEDIUM,
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
    // backgroundColor: "red"
  },
  input: {
    backgroundColor: colors.BG_GREY,
    marginVertical: constants.MARGIN_VERTICAL_MEDIUM * 1.5,
    width: '80%',
    alignSelf: 'center',
    fontSize: constants.FONT_MEDIUM,
    textAlign: "center"
  },
  inputContainer: {
    alignItems: "center"
  },
  button: {
    marginTop: constants.MARGIN_VERTICAL_SMALL * 1.5,
  },
});
