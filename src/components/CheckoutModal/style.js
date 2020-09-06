import {StyleSheet} from 'react-native';

import colors from '../../config/colors';
import constants from '../../config/constants';

export default StyleSheet.create({
  popupContainer: {
    backgroundColor: colors.OVERLAY_COLOR,
    flex: 1,
    justifyContent: 'flex-end',
  },
  box: {
    // flex: 0.60,
    backgroundColor: 'white',
    // marginBottom: constants.MARGIN_VERTICAL_MEDIUM * 3
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: constants.PADDING_MEDIUM * 1.6,
    paddingVertical: constants.PADDING_SMALL,
  },
  inputContainer: {
    paddingHorizontal: constants.PADDING_MEDIUM * 1.6,
    marginVertical: constants.MARGIN_VERTICAL_SMALL
  },
  filterText: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL * 1.5,
  },
  borderLine: {
    borderTopWidth: 1,
    borderTopColor: colors.GREY,
    borderStyle: 'solid',
    width: '100%',
    // marginVertical: constants.MARGIN_VERTICAL_XSMALL,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: constants.PADDING_MEDIUM,
  },
  tabTextStyle: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL * 1.3,
  },
  tabTextUnselected: {
    color: colors.GREY,
  },
  tabBarBorderLineBox: {
    marginHorizontal: constants.MARGIN_X_SMALL * 1.3,
  },
  tabBarBorderLine: {
    borderTopWidth: 2,
    borderTopColor: colors.RED,
    borderStyle: 'solid',
    width: constants.WINDOW_WIDTH * 0.2,
    marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.55,
  },
  lineCenter: {
    alignItems: 'center',
  },
  lineRight: {
    alignItems: 'flex-end',
  },

  // Sort tab Style

  listItem: {
    borderBottomWidth: 0,
  },
  radioBox: {
    alignItems: 'center',
    marginBottom: -constants.MARGIN_VERTICAL_XSMALL,
  },
  radioCircle: {
    marginHorizontal: constants.MARGIN_MEDIUM,
  },
  radioText: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  bottomBorderLine: {
    borderTopWidth: 2,
    borderTopColor: colors.LIGHT_GREY,
    borderStyle: 'solid',
    width: '100%',
    marginTop: constants.MARGIN_VERTICAL_SMALL,
  },
  tabContainer: {
    paddingHorizontal: constants.PADDING_MEDIUM,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    marginVertical: constants.MARGIN_SMALL,
  },
});
