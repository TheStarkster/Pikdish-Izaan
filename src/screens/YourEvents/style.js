import {StyleSheet} from 'react-native';

import colors from '../../config/colors';
import constants from '../../config/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: constants.MARGIN_SMALL,
    marginBottom: constants.MARGIN_VERTICAL_XSMALL,
  },
  secondContainer: {
    marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.6,
    paddingHorizontal: constants.PADDING_MEDIUM * 0.8,
  },
  eventListContianer: {
    backgroundColor: colors.WHITE,
    marginBottom: constants.MARGIN_VERTICAL_XSMALL,
    // backgroundColor: "red"
  },
  eventText: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_MEDIUM,
  },
  miniContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginTop: constants.MARGIN_SMALL,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1
  },
  eventDetailsContainer: {
    // marginTop: constants.MARGIN_SMALL,
    flexDirection: 'row',
    // flex: 1
    // alignItems: 'flex-start',
  },
  eventDetails: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 0.9,
    marginRight: constants.MARGIN_X_SMALL,
  },
  eventDetailsContainer2: {
    minWidth: constants.WINDOW_WIDTH * 0.33
  },
  eventValue: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 0.9,
  },
  eventValue2: {
    lineHeight: constants.FONT_SMALL * 1.355
  },
  bgImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: constants.MARGIN_MEDIUM,
  },
  bgImage: {
    width: constants.WINDOW_WIDTH * 0.9,
    height: constants.WINDOW_WIDTH * 0.5,
    borderRadius: 20,
  },
  bottomPart: {
    marginTop: constants.MARGIN_LARGE * 1.7,
  },
});
