import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  cameraContainer: {
    flex: 1,
    backgroundColor: colors.GREY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraArea: {
    width: '80%',
    height: '70%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconContainer: {
    width: constants.WINDOW_WIDTH * 0.15,
    height: constants.WINDOW_WIDTH * 0.15,
    borderRadius: (constants.WINDOW_WIDTH * 0.15) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GREY,
  },
  cameraIcon: {
    width: '55%',
    height: '55%',
  },
  cameraText: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  messageBox: {
    height: constants.WINDOW_HEIGHT * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_MEDIUM * 0.7,
  },
  error: {
    fontFamily: 'Nunito-Bold',
    color: colors.RED,
    fontSize: constants.FONT_MEDIUM * 0.7,
  },
  exploreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exploreText: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  rightArrowIcon: {
    marginLeft: constants.MARGIN_X_SMALL,
    alignSelf: 'flex-end',
    width: constants.WINDOW_WIDTH * 0.04,
    height: constants.WINDOW_WIDTH * 0.04,
  },
  qrCamera: {
    flex: 1,
    backgroundColor: 'green',
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
  },
});
