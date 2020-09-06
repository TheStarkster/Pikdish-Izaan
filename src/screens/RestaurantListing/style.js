import {StyleSheet} from 'react-native';

import constants from '../../config/constants';
import colors from '../../config/colors';

export default StyleSheet.create({
  mainHeader: {
    height: constants.WINDOW_HEIGHT * 0.07,
  },
  header: {
    height: constants.WINDOW_HEIGHT * 0.075,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 0,
    paddingTop: 0,
    justifyContent: 'flex-start',
  },
  headerText: {
    marginTop: -constants.MARGIN_VERTICAL_XSMALL * 0.5,
    fontSize: constants.FONT_SMALL * 1.2,
    color: colors.RED,
    fontFamily: 'Nunito-Regular',
    borderBottomColor: colors.GREY,
    borderBottomWidth: 0.5,
  },
  headerLabel: {
    marginHorizontal: constants.MARGIN_X_SMALL,
    fontSize: constants.FONT_X_SMALL,
    fontFamily: 'Nunito-Regular',
  },
  starImage: {
    width: constants.WINDOW_WIDTH * 0.03,
    height: constants.WINDOW_WIDTH * 0.03,
  },
  afterSlider: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  veg: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL,
    marginRight: constants.MARGIN_SMALL,
  },
  filterIcon: {
    width: constants.WINDOW_WIDTH * 0.04,
    // marginHorizontal: constants.MARGIN_SMALL,
    height: constants.WINDOW_WIDTH * 0.04,
  },
  filterText: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL,
    marginHorizontal: constants.MARGIN_X_SMALL * 0.6,
  },
  sliderImageContainer: {
    height: constants.WINDOW_HEIGHT * 0.16,
    width: constants.WINDOW_WIDTH * 0.5,
  },
});
