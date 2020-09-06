import {StyleSheet} from 'react-native';

import constants from '../../config/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    minHeight: constants.WINDOW_HEIGHT * 0.6,
    paddingHorizontal: constants.PADDING_MEDIUM,
    marginTop: constants.MARGIN_VERTICAL_SMALL,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    paddingVertical: constants.PADDING_SMALL
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
  },
  dishIcon: {
    width: constants.WINDOW_WIDTH * 0.3,
    height: constants.WINDOW_WIDTH * 0.3,
  },
  restaurantName: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 1.2,
  },
  address: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  reviewText: {
    fontSize: constants.FONT_X_SMALL,
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.2,
  },
  textInput: {paddingTop: 0, paddingBottom: 0},
  buttonContainer: {
    paddingHorizontal: constants.PADDING_MEDIUM,
    marginTop: constants.MARGIN_VERTICAL_SMALL
  }
});
