import {StyleSheet} from 'react-native';

import constants from '../../config/constants';

export default StyleSheet.create({
  container: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: 'white',

    // BOX SHADOW
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  input: {
    width: '60%',
    height: constants.WINDOW_HEIGHT * 0.07,
    textAlign: 'center',
    fontSize: constants.FONT_SMALL,
    fontWeight: 'bold',
    paddingVertical: 0,
  },
});
