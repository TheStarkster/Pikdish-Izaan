import {StyleSheet} from 'react-native';

import constants from '../../config/constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.4,
    paddingHorizontal: constants.PADDING_SMALL * 1.25,
  },
  image: {
    width: constants.WINDOW_WIDTH * 0.03,
    height: constants.WINDOW_WIDTH * 0.03,
  },
  heading: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_MEDIUM * 0.7,
  },
  paragraphContainer: {
    paddingLeft: constants.PADDING_MEDIUM * 1.65,
    paddingRight: constants.PADDING_SMALL,
  },
  paragraph: {
    fontFamily: 'Nunito-Regular',
    lineHeight: 17,
    fontSize: constants.FONT_SMALL * 1.1,
  },
});
