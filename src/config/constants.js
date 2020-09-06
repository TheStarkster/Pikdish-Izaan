import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

const constants = {
  WINDOW_WIDTH: width,
  WINDOW_HEIGHT: height,
  PADDING_MEDIUM: width * 0.06,
  PADDING_SMALL: width * 0.03,
  PADDING_X_SMALL: width * 0.015,
  PADDING_VERTICAL_MEDIUM: height * 0.02,
  FONT_MEDIUM: calculateFont(width * 0.075),
  FONT_SMALL: calculateFont(width * 0.04),
  FONT_SMALL_FIXED: width * 0.04,
  FONT_X_SMALL: calculateFont(width * 0.03),
  FONT_SMALL_LINE_HEIGHT: width * 0.05,
  MARGIN_X_SMALL: width * 0.01,
  MARGIN_SMALL: width * 0.03,
  MARGIN_MEDIUM: width * 0.05,
  MARGIN_LARGE: width * 0.12,
  MARGIN_XLARGE: width * 0.2,
  MARGIN_VERTICAL_XSMALL: height * 0.015,
  MARGIN_VERTICAL_SMALL: height * 0.025,
  MARGIN_VERTICAL_MEDIUM: height * 0.035,
  INDIAN_CURRENCY_SYMBOL: '₹',
  TAB_ICON_WIDTH: 28,
  TAB_ICON_HEIGHT: 22,
  TAB_ROUTES_WITH_NO_TAB: ['Offers', 'ViewCart', 'RestaurantWelcomePage'],
  BASE_URL: 'http://pikdish.com/v2_api/App',
  BASE_PIC_PATH: 'http://pikdish.com/v2_api/uploads/',
  USER_PIC_PATH: 'http://pikdish.com/v2_api/uploads/users/',
  RESTAURANT_LOGO_PATH: 'http://pikdish.com/v2_api/uploads/images/',
  ITEM_PIC_PATH: 'http://pikdish.com/v2_api/uploads/items/',
  TABLE_ORDER_TYPE: '1',
  PRE_ORDER_TYPE: '2',
  TAKE_AWAY_TYPE: '3',
  DELIVERY_TYPE: '4',
  ROOM_SERVICE_TYPE: '5',
  EVENT_TYPE: '6',
  FOOD_COURT_TYPE: '3',
  FLAT_DISCOUNT_TEXT: 'flat_dis_running',
  ITEM_DISCOUNT_TEXT: 'dis_on_item_running',
  FLAT_DISCOUNT_CODE: '1',
  ITEM_DISCOUNT_CODE: '2',
  VEG_FOOD_TYPE: '1',
  NON_VEG_FOOD_TYPE: '2',
  BOTH_FOOD_TYPE: '0',
  GEOCODE_URL: 'https://maps.googleapis.com/maps/api/geocode/json',
  GOOGLE_MAP_API_KEY: 'AIzaSyCwp9DpmsECEL3D3IqFRB0h5ikmnyissyw',
  RESTAURANT_FILTER_CODE: {
    MY_FAV: '0',
    OFFER_ONLY: '1',
    VEG: '2',
    HAPPY_HOURS: '3',
  },
  RESTAURANT_ORDER_BY_CODE: {
    RELEVANCE: '0',
    ALPHABETICAL: '1',
    DISCOUNT: '2',
    RATING: '3',
  },
  CATEGORIES: [
    {
      category_name: 'Recommended',
    },
    {
      category_name: 'Happy Hours',
    },
  ],
};

constants.ORDER_TYPES = {
  [constants.TABLE_ORDER_TYPE]: 'Table Order',
  [constants.PRE_ORDER_TYPE]: 'Pre-Order',
  [constants.TAKE_AWAY_TYPE]: 'Take Away',
  [constants.DELIVERY_TYPE]: 'Delivery',
};

export default constants;

function calculateFont(size) {
  const max = width * 0.075;
  let fontScale = PixelRatio.getFontScale();

  if (fontScale > 1.2) fontScale = 1.1;

  const sizeWithScale = size * fontScale;

  return sizeWithScale > max ? max : sizeWithScale;
}

export function calculateLineHeight(size) {
  let fontScale = PixelRatio.getFontScale();

  if (fontScale > 1.2) fontScale = 1.1;

  const sizeWithScale = size * fontScale;

  return sizeWithScale;
}
