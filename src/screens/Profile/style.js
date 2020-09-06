import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
  },
  username: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 1.5,
  },
  mobileNo: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL * 1.2,
  },
  rightArrowIcon: {
    width: constants.WINDOW_WIDTH * 0.04,
    height: constants.WINDOW_WIDTH * 0.04,
  },
  avatar: {
    width: constants.WINDOW_WIDTH * 0.27,
    height: constants.WINDOW_WIDTH * 0.27,
  },
  avatarSiblingContainer: {
    flex: 1,
    paddingLeft: constants.PADDING_MEDIUM * 1.2,
  },
  listContainer: {
    marginTop: constants.MARGIN_SMALL * 1.5,
  },
  dashedBorder: {
    width: '95%',
    height: 1,
    marginTop: constants.MARGIN_VERTICAL_SMALL,
  },
  dashedTopBorder: {
    width: '95%',
    height: 1,
    marginBottom: constants.MARGIN_VERTICAL_SMALL,
  },
  listContainerSecond: {
    marginLeft: constants.MARGIN_MEDIUM * 1.3,
    marginTop: constants.MARGIN_VERTICAL_SMALL,
  },
  buttonContainer: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    flex: 0.8,
  },
  version: {
    textAlign: 'center',
    color: colors.GREY,
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Regular',
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.3,
  },
});
