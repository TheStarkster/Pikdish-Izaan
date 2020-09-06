import {StyleSheet} from 'react-native';

import colors from '../../config/colors';
import constants from '../../config/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.LIGHTEST_GREY,
  },
  secondContainer: {
    marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.6,
    paddingHorizontal: constants.PADDING_MEDIUM * 0.8,
  },
  eventListContianer: {
    backgroundColor: colors.WHITE,
    marginBottom: constants.MARGIN_VERTICAL_XSMALL,
  },
  eventText: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_MEDIUM,
  },
  miniContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: constants.MARGIN_SMALL,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDetailsContainer: {
    marginTop: constants.MARGIN_SMALL,
  },
  eventDetails: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 0.9,
  },
  bgImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: constants.MARGIN_MEDIUM,
  },
  bgImage: {
    width: constants.WINDOW_WIDTH * 0.9,
    height: constants.WINDOW_WIDTH * 0.5,
    borderRadius: 10,
  },
  bottomPart: {
    marginTop: constants.MARGIN_LARGE * 1.7,
  },
});
