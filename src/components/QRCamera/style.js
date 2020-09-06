import {StyleSheet} from 'react-native';

import constants from '../../config/constants';

export default StyleSheet.create({
  containerStyle: {
    overflow: 'hidden',
    position: "relative",
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  qrCamera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanArea: {
    width: constants.WINDOW_WIDTH * 0.5,
    height: constants.WINDOW_WIDTH * 0.5,
    position: 'absolute',
    zIndex: 1,
    borderColor: 'white',
    borderWidth: 0.5,
    left: "25%",
    top: "12.5%"
  },
});
