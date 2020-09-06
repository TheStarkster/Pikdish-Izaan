import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  box: {
    flex: 0.8,
    minWidth: '50%',
    marginHorizontal: constants.MARGIN_X_SMALL * 1.3,
    marginVertical: constants.MARGIN_X_SMALL * 1.3,
  },
  bgImage: {
    height: constants.WINDOW_WIDTH * 0.45,
    width: '100%',
    // borderRadius: 20
  },
  homeContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    flexWrap: 'wrap',
    flex: 1,
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
  },
  imageContainer: {
    flex: 0.5,
  },
  textContainer: {
    height: constants.WINDOW_HEIGHT * 0.055,
    backgroundColor: colors.RED,
    justifyContent: 'center',
  },
  imageText: {
    fontSize: constants.FONT_SMALL * 0.9,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
    color: colors.WHITE,
  },
});
