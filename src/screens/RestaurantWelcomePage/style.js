import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  backgroundImage: {
    width: constants.WINDOW_WIDTH,
    height: constants.WINDOW_HEIGHT,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    backgroundColor: '#ffffff',
    width: constants.WINDOW_WIDTH * 0.75,
    minHeight: 220,
    height: constants.WINDOW_HEIGHT * 0.3,
    // maxHeight: 190,
    borderRadius: 10,
    alignItems: 'center',
  },
  welcomeContainerImageBox: {
    width: constants.WINDOW_WIDTH * 0.22,
    height: constants.WINDOW_WIDTH * 0.22,
    backgroundColor: '#ffffff',
    marginTop: -(constants.WINDOW_HEIGHT * 0.045),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: constants.WINDOW_WIDTH * 0.11,
  },
  welcomeContainerImage: {
    width: '60%',
    height: '60%',
    borderRadius: 3,
  },
  welcomeText: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL * 1.2,
    marginTop: -(constants.WINDOW_HEIGHT * 0.012),
  },
  tableNo: {
    fontFamily: 'Nunito-Regular',
    color: colors.RED,
    fontSize: constants.FONT_SMALL,
  },
  borderLine: {
    borderTopWidth: 3,
    borderTopColor: colors.LIGHT_GREY,
    borderStyle: 'solid',
    width: '75%',
    marginTop: constants.WINDOW_HEIGHT * 0.018,
  },
  textDisappearsBox: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textDisappears: {
    paddingBottom: constants.WINDOW_HEIGHT * 0.007,
    color: colors.YELLOW,
  },
});
