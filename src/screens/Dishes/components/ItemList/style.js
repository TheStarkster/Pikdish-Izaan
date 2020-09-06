import {StyleSheet} from 'react-native';

import constants from '../../../../config/constants';
import colors from '../../../../config/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    minHeight: constants.WINDOW_HEIGHT * 0.12,
    paddingTop: constants.PADDING_VERTICAL_MEDIUM * 0.7,
    paddingBottom: constants.PADDING_VERTICAL_MEDIUM,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  greenBox: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
    marginHorizontal: constants.MARGIN_SMALL * 0.6,
    width: constants.WINDOW_WIDTH * 0.04,
    height: constants.WINDOW_WIDTH * 0.04,
    borderColor: 'green',
    borderWidth: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  greenCircle: {
    width: constants.WINDOW_WIDTH * 0.02,
    height: constants.WINDOW_WIDTH * 0.02,
    backgroundColor: 'green',
    borderRadius: (constants.WINDOW_WIDTH * 0.02) / 2,
  },
  item: {
    fontSize: constants.FONT_SMALL * 0.9,
    lineHeight: 14,
    fontFamily: 'Nunito-Bold',
  },
  button: {
    width: constants.WINDOW_WIDTH * 0.2,
    height: constants.WINDOW_WIDTH * 0.08,
    flex: 0,
    marginHorizontal: constants.MARGIN_X_SMALL,
  },
  buttonContainer: {
    flex: 0,
  },
  box: {
    width: constants.WINDOW_WIDTH * 0.03,
    height: constants.WINDOW_WIDTH * 0.03,
    alignSelf: 'flex-start',
    marginRight: constants.MARGIN_X_SMALL * 1.5,
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.2,
  },
  price: {
    fontSize: constants.FONT_SMALL * 0.8,
    fontFamily: 'Nunito-Regular',
    // marginTop: -constants.WINDOW_HEIGHT * 0.006,
    color: colors.RED,
    marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.2,
  },
  priceCut: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: colors.GREY,
  },
  extra: {
    fontSize: constants.FONT_SMALL * 0.8,
    fontFamily: 'Nunito-Regular',
    marginTop: -constants.WINDOW_HEIGHT * 0.01,
    color: colors.GREY,
  },
  customizableText: {
    color: colors.GREY,
    fontSize: constants.FONT_X_SMALL,
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
  },
});
