import {StyleSheet} from 'react-native';

import colors from '../../config/colors';
import constants from '../../config/constants';

export default StyleSheet.create({
  customizePopupContainer: {
    backgroundColor: colors.OVERLAY_COLOR,
    flex: 1,
    justifyContent: 'flex-end',
  },
  section: {
    paddingHorizontal: constants.PADDING_MEDIUM,
    marginVertical: constants.MARGIN_VERTICAL_SMALL,
  },
  sectionHeading: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_MEDIUM * 0.6,
    marginBottom: constants.MARGIN_VERTICAL_SMALL * 0.6,
  },
  customizeBox: {
    backgroundColor: colors.WHITE,
  },
  customizePopupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: constants.MARGIN_MEDIUM,
    //    marginVertical: constants.PADDING_SMALL,
    justifyContent: 'space-between',
  },
  coloredCircleBox: {
    width: constants.WINDOW_WIDTH * 0.025,
    height: constants.WINDOW_WIDTH * 0.025,
    marginHorizontal: constants.MARGIN_SMALL * 0.4,
  },
  customizePopupHeaderText: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL * 1.3,
    marginTop: constants.MARGIN_SMALL,
  },
  amount: {
    // width: constants.WINDOW_WIDTH * 0.17,
    // textAlign: 'right',
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
    // marginTop: -(constants.WINDOW_WIDTH * 0.030),
    color: colors.RED,
  },
  popupHeaderBorderLine: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: colors.GREY,
    borderStyle: 'solid',
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.5,
    marginBottom: constants.MARGIN_SMALL,
  },

  // Radio Button comp styles

  popupRadioContainer: {
    marginHorizontal: constants.MARGIN_MEDIUM,
  },
  radioButtonsTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL * 1.2,
    marginHorizontal: constants.MARGIN_MEDIUM,
    marginTop: constants.MARGIN_XSMALL,
    marginBottom: constants.MARGIN_XSMALL,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  radioBottomBorderBox: {
    alignItems: 'center',
    marginTop: constants.MARGIN_SMALL,
  },
  radioBottomBorder: {
    width: '60%',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.GREY,
    borderStyle: 'solid',
  },

  // CheckBox Styles

  popupCheckboxContainer: {
    marginHorizontal: constants.MARGIN_MEDIUM * 1.7,
  },
  checkBoxTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL * 1.2,
    marginTop: constants.MARGIN_XSMALL,
    marginBottom: constants.MARGIN_XSMALL,
  },

  // Button Styles

  mainContainer: {
    paddingHorizontal: constants.PADDING_MEDIUM,
    marginBottom: constants.MARGIN_MEDIUM,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.RED,
    paddingVertical: constants.PADDING_SMALL,
    paddingHorizontal: constants.PADDING_MEDIUM,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'Nunito-Bold',
    color: colors.WHITE,
    fontSize: constants.FONT_SMALL * 1.1,
  },
});
