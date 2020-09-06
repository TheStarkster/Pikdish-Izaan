import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.OVERLAY_COLOR,
    justifyContent: 'flex-end',
    flex: 1,
  },
  container: {
    height: constants.WINDOW_HEIGHT * 0.6,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: constants.PADDING_MEDIUM,
    justifyContent: 'space-between',
    borderColor: 'black',
    borderBottomWidth: 0.5,
    paddingVertical: constants.PADDING_SMALL,
  },
  headerTitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 1.5,
  },
  closeIcon: {
    width: constants.WINDOW_WIDTH * 0.04,
    height: constants.WINDOW_WIDTH * 0.04,
  },
  itemContainer: {
    paddingHorizontal: constants.PADDING_MEDIUM,
  },
  image: {
    width: constants.WINDOW_WIDTH * 0.3,
    height: constants.WINDOW_WIDTH * 0.2,
  },
  item: {
    marginTop: constants.MARGIN_VERTICAL_SMALL,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderBottomWidth: 0.5,
    // height: constants.WINDOW_HEIGHT * 0.2
    paddingBottom: constants.PADDING_VERTICAL_MEDIUM,
  },
  afterImage: {
    marginLeft: constants.PADDING_MEDIUM * 1.5,
  },
  itemTitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 1.1,
    marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.3
  },
  price: {
    color: colors.RED,
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Regular',
    includeFontPadding: false,
    marginTop: -constants.MARGIN_VERTICAL_XSMALL * 0.3,
    flex: 1,
  },
  buttonContainer: {
    alignItems: "flex-start",
    // backgroundColor: "red"
  }
});
