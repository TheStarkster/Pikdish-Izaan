import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform, PermissionsAndroid, Linking, Clipboard} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {StackActions, NavigationActions} from 'react-navigation';

import constants from '../config/constants';

const copy = text => {
  Clipboard.setString(text);
};

function getStackReseter(routeName, params = {}) {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName, params})],
  });

  return resetAction;
}

const fetchApi = async (url, body, token) => {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      method: 'POST',
    };

    if (token) {
      options.headers = {Authorization: token, ...options.headers};
    }

    const response = await fetch(url, options);

    if (url === 'http://pikdish.com/v2_api/paytm/pgRedirect.php') {
      const text = await response.text();

      if (isJSON(text)) {
        const json = await response.json();

        if (json.success === 'false') throw new Error(json.error);

        return json;
      }

      return text;
    }
    const clone = response.clone();

    console.log('clone =>', await clone.text());

    const json = await response.json();

    if (json.success === 'false') throw new Error(json.error);

    return json;
  } catch (e) {
    console.log('error in url =>', url);
    console.log('e =>', e.message);
    throw e;
  }
};

function processRatings(ratings) {
  const o = {};

  ratings.forEach(item => {
    if (o[item.rating]) {
      return (o[item.rating] = o[item.rating] + 1);
    }

    o[item.rating] = 1;
  });

  return o;
}

function isItemDiscount(restaurant) {
  return (
    restaurant.is_happy_hours === constants.ITEM_DISCOUNT_CODE &&
    restaurant.is_hh_running.happy_hour === constants.ITEM_DISCOUNT_TEXT
  );
}

function isFlatDiscount(restaurant) {
  return (
    restaurant.is_happy_hours === constants.FLAT_DISCOUNT_CODE &&
    restaurant.is_hh_running.happy_hour === constants.FLAT_DISCOUNT_TEXT
  );
}

const validateEmail = email => {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  return expression.test(String(email).toLowerCase());
};

async function requestLocationPermission() {
  try {
    const platform = Platform.OS;

    if (platform !== 'ios') return getLocationAndroid();

    const permission = PERMISSIONS.IOS.LOCATION_ALWAYS;
    const checkResult = await check(permission);

    if (checkResult === RESULTS.GRANTED) return 'granted';
    if (checkResult === RESULTS.BLOCKED)
      throw new Error('Location permission is blocked');
    if (checkResult === RESULTS.UNAVAILABLE)
      throw new Error('The requested server is unavailable on your device');

    const permissionResponse = await request(permission);
    return permissionResponse;
  } catch (e) {
    throw e;
  }
}

async function getLocationAndroid() {
  try {
    if (Geolocation.hasLocationPermission) return 'granted';

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Need location permission',
        message: 'Need location permission to show delivery route',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED)
      throw new Error('Please grant permission');

    return 'granted';
  } catch (e) {
    throw e;
  }
}

function getLocation() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
}

async function getLocationWithPermission() {
  const dummyLocation = {latitude: '1', longitude: '1'};

  try {
    // const location = await requestLocationPermission();

    // if (location === 'granted') {
    //   const locationResponse = await getLocation();

    //   const location = {
    //     latitude: locationResponse.coords.latitude,
    //     longitude: locationResponse.coords.longitude,
    //   };

    //   return location;
    // }

    return dummyLocation;
  } catch (e) {
    return dummyLocation;
  }
}

async function openDialer(phone) {
  try {
    let phoneNumber = phone;

    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }

    const supported = await Linking.canOpenURL(phoneNumber);

    if (!supported) throw new Error('Phone number is not available');

    return Linking.openURL(phoneNumber);
  } catch (e) {
    throw e;
  }
}

async function openFacebook(rawUrl) {
  try {
    const url = `fb://facewebmodal/f?href=${rawUrl}`;
    const supported = await Linking.canOpenURL(url);

    if (!supported) throw new Error('Facebook is not available');

    return Linking.openURL(url);
  } catch (e) {
    throw e;
  }
}

function extractUsernameFromSocialLink(url) {
  return url.split('com/')[1];
}

async function openInstagram(rawUrl) {
  try {
    const username = extractUsernameFromSocialLink(rawUrl);

    const url =
      Platform.OS === 'ios'
        ? `instagram://user?username=${username}`
        : `instagram://user?username=${username}`;

    const supported = await Linking.canOpenURL(url);

    if (!supported) throw new Error('Instagram is not available');

    return Linking.openURL(url);
  } catch (e) {
    throw e;
  }
}

async function openWebsite(url) {
  try {
    const supported = await Linking.canOpenURL(url);

    if (!supported) throw new Error('Browser is not available');

    return Linking.openURL(url);
  } catch (e) {
    throw e;
  }
}

function checkAlphabetsAndSpace(text) {
  const reg = new RegExp(/^[a-zA-Z ]*$/);

  return reg.test(text);
}

function isTableOrder(orders) {
  return orders.some(item => item.order_type === constants.TABLE_ORDER_TYPE);
}

function calculateDiscount(data, restaurant) {
  const percent =
    data.baserate * (restaurant.is_hh_running.flat_discount / 100);

  const price = data.baserate - percent;

  return Number(price);
}

function calculateTotalPrice(data, restaurant, cart = []) {
  const price = data.reduce((acc, item) => {
    const foundItem = cart.find(i => i.rest_item_id === item.id);

    let addon = 0;
    let topping = 0;
    let portion = 0;
    let rest_portion_id;

    if (foundItem) {
      if (!foundItem.addon_items) {
        foundItem.addon_items = [];
      }

      if (!foundItem.topping_items) {
        foundItem.topping_items = [];
      }

      rest_portion_id = foundItem.rest_portion_id;
      addon = foundItem.addon_items.reduce(
        (acc, i) => acc + Number(i.amount),
        0,
      );
      topping = foundItem.topping_items.reduce(
        (acc, i) => acc + Number(i.amount),
        0,
      );
      // portions.forEach(i => {
      //   if (i.portion_id === foundItem.rest_portion_id) {
      //     portion = getPortionPrice(restaurant, i);
      //   }
      // });
    }

    const qty = Number(item.qty) || 1;

    return (
      acc +
      (getPrice(item, restaurant, rest_portion_id) +
        addon +
        topping +
        portion) *
        qty
    );
  }, 0);

  return price;
}

function getPrice(item, restaurant, portion_id) {
  let price = item.baserate;
  let happyrate = item.happyrate;

  if (portion_id && item.portions && item.portions.length) {
    const portion = item.portions.find(item => item.portion_id === portion_id);

    if (portion) {
      price = Number(portion.baserate);
      happyrate = Number(portion.happyrate);
    }
  }

  if (isFlatDiscount(restaurant)) {
    return calculateDiscount(item, restaurant);
  }

  if (isItemDiscount(restaurant)) {
    return Number(happyrate) || Number(price);
  }

  return Number(price);
}

function getPortionPrice(data, item) {
  if (data.is_happy_hours === '1') {
    return Number(item.happyrate) || Number(item.baserate);
  } else {
    return Number(item.baserate);
  }
}

function getRestaurantDiscount(restaurant = {}, totalPrice = 0) {
  let discount = 0;

  if (
    restaurant.is_discount === '1' &&
    restaurant.is_offer_percent_rs === '0'
  ) {
    discount = Number(restaurant.percent_rs_value);
  }

  if (
    restaurant.is_discount === '1' &&
    restaurant.is_offer_percent_rs === '1'
  ) {
    discount = totalPrice * (Number(restaurant.percent_rs_value) / 100);
  }

  return discount;
}

function calculateTax(allItems = [], restaurant = {}, bill = {}) {
  const tax = {sgstPercentage: 0, igstPercentage: 0, cgstPercentage: 0};

  if (restaurant.is_tax_applicable === '2') {
    allItems.forEach(item => {
      const sgst = Number(item.sgst_percentage);
      const cgst = Number(item.cgst_percentage);
      const igst = Number(item.igst_percentage);

      const price = getPrice(item, restaurant);

      tax.sgstPercentage += price * (sgst / 100);
      tax.sgstRatio = sgst;
      tax.cgstPercentage += price * (cgst / 100);
      tax.cgstRatio = cgst;
      tax.igstPercentage += price * (igst / 100);
      tax.igstRatio = igst;
    });
  }

  if (restaurant.is_tax_applicable === '1') {
    const sgst = Number(restaurant.sgst_percentage);
    const cgst = Number(restaurant.cgst_percentage);
    const igst = Number(restaurant.igst_percentage);

    tax.sgstPercentage += bill.totalWithoutTax * (sgst / 100);
    tax.sgstRatio = sgst;
    tax.cgstPercentage += bill.totalWithoutTax * (cgst / 100);
    tax.cgst = cgst;
    tax.igstPercentage += bill.totalWithoutTax * (igst / 100);
    tax.igst = igst;
  }

  return {...bill, ...tax};
}

function getServiceCharges(restaurant) {
  const charges = restaurant.service_charges_per || '0';

  return Number(charges);
}

function calculateItemCount(data) {
  return data.reduce((acc, item) => {
    return acc + Number(item.qty);
  }, 0);
}

function getPackageCharges(allItems, restaurant) {
  if (!restaurant) return 0;

  let packingCharges = restaurant.packing_charges;

  if (restaurant.is_fix_packing_charges === '1') {
    packingCharges = allItems.reduce((acc, item) => {
      return Number(item.packing_charges) + acc;
    }, 0);
  }

  return packingCharges;
}

function getDeliveryCharges(restaurant) {
  if (!restaurant) return 0;

  return restaurant.delivery_charges;
}

function markString(string, characterToShow = 3, symbol = 'X') {
  if (typeof string !== 'string') return string;

  if (string.length <= characterToShow) return string;

  const arr = string.split('');

  const length = arr.length - characterToShow;

  for (let i = 0; i < length; i++) {
    arr[i] = symbol;
  }

  return arr.join('');
}

function calculateBill(
  allItems,
  restaurant,
  orderType,
  extraCharges = [],
  cart,
) {
  let bill = {
    itemTotal: calculateTotalPrice(allItems, restaurant, cart),
    serviceCharges: getServiceCharges(restaurant),
  };

  bill.totalWithoutTax = bill.itemTotal;

  if (
    orderType === constants.TAKE_AWAY_TYPE ||
    orderType === constants.DELIVERY_TYPE
  ) {
    bill.packingCharges = getPackageCharges();
    bill.totalWithoutTax =
      Number(bill.totalWithoutTax) + Number(bill.packingCharges);
  }

  if (orderType === constants.DELIVERY_TYPE) {
    bill.deliveryCharges = getDeliveryCharges();
    bill.totalWithoutTax =
      Number(bill.totalWithoutTax) + Number(bill.deliveryCharges);
  }

  bill = calculateTax(allItems, restaurant, bill);

  bill.totalBill =
    bill.totalWithoutTax +
    bill.igstPercentage +
    bill.sgstPercentage +
    bill.serviceCharges +
    bill.cgstPercentage;

  bill.restaurantDiscount = getRestaurantDiscount(restaurant, bill.totalBill);

  bill.totalBill = bill.totalBill - bill.restaurantDiscount;

  if (extraCharges.length) {
    bill.totalBill += extraCharges.reduce((acc, item) => acc + item, 0);
  }

  return bill;
}

function isCustomizable(item) {
  const portions = item.portions || [];
  const topping = item.topping || [];
  const addon = item.addon || [];

  if (!portions.length && !topping.length && !addon.length) {
    return false;
  }

  return true;
}

function getCuisine(restaurant) {
  const c = restaurant.cuisine || [];

  const cuisine = c.map(item => item.cuisine_name).join(', ');

  return cuisine;
}

function splitArrayHalf(data = []) {
  if (!data.length) {
    return [[], []];
  }

  const halfwayThrough = Math.ceil(data.length / 2);
  const arrayFirstHalf = data.slice(0, halfwayThrough);
  const arraySecondHalf = data.slice(halfwayThrough, data.length);

  return [arrayFirstHalf, arraySecondHalf];
}

function isJSON(str) {
  try {
    if (str && typeof str === 'object') {
      return true;
    }

    const j = JSON.parse(str);

    if (j === null) throw {};

    return typeof j === 'object';
  } catch (e) {
    return false;
  }
}

export default {
  validateEmail,
  requestLocationPermission,
  getLocationAndroid,
  getLocation,
  openDialer,
  openFacebook,
  openInstagram,
  openWebsite,
  fetchApi,
  copy,
  checkAlphabetsAndSpace,
  getStackReseter,
  isTableOrder,
  extractUsernameFromSocialLink,
  isItemDiscount,
  calculateDiscount,
  calculateTotalPrice,
  isFlatDiscount,
  calculateItemCount,
  getPrice,
  calculateTax,
  getRestaurantDiscount,
  getServiceCharges,
  getPackageCharges,
  getDeliveryCharges,
  calculateBill,
  getLocationWithPermission,
  markString,
  isCustomizable,
  getCuisine,
  splitArrayHalf,
  getPortionPrice,
  processRatings,
  isJSON,
};
