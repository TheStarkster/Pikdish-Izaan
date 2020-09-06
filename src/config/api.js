import constants from './constants';
import helpers from './helpers';

const api = {};

api.fetchAppTheme = function(body) {
  const url = `${constants.BASE_URL}/AppTheme`;

  return helpers.fetchApi(url, body);
};

api.login = function(body) {
  const url = `${constants.BASE_URL}/AppLogin`;

  return helpers.fetchApi(url, body);
};

api.register = function(body) {
  const url = `${constants.BASE_URL}/AppSignUp`;

  return helpers.fetchApi(url, body);
};

api.forgotPassword = function(body) {
  const url = `${constants.BASE_URL}/AppForgotPin`;

  return helpers.fetchApi(url, body);
};

api.verifyOTP = function(body) {
  const url = `${constants.BASE_URL}/OTPVerify`;

  return helpers.fetchApi(url, body);
};

api.appGetCountryData = function(body) {
  const url = `${constants.BASE_URL}/AppGetCountryData`;

  return helpers.fetchApi(url, body);
};

api.appReadQRCode = function(body) {
  const url = `${constants.BASE_URL}/AppReadQRCode`;

  return helpers.fetchApi(url, body);
};

api.getUserProfile = function(body, token) {
  const url = `${constants.BASE_URL}/GetUserProfile`;

  return helpers.fetchApi(url, body, token);
};

api.setUserProfile = function(body, token) {
  const url = `${constants.BASE_URL}/SetUserProfile`;

  return helpers.fetchApi(url, body, token);
};

api.changePIN = function(body) {
  const url = `${constants.BASE_URL}/ChangePIN`;

  return helpers.fetchApi(url, body);
};

api.userAllOrders = function(body) {
  const url = `${constants.BASE_URL}/UserAllOrders`;

  return helpers.fetchApi(url, body);
};

api.appRestroList = function(body) {
  const url = `${constants.BASE_URL}/AppRestroList`;

  return helpers.fetchApi(url, body);
};

api.appRestroListPageTopAds = function(body) {
  const url = `${constants.BASE_URL}/AppRestroListPageTopAds`;

  return helpers.fetchApi(url, body);
};

api.getMyFavRestroList = function(body) {
  const url = `${constants.BASE_URL}/GetMyFavRestroList`;

  return helpers.fetchApi(url, body);
};

api.removeRestaurantFromFavList = function(body) {
  const url = `${constants.BASE_URL}/RemoveRestaurantFromFavList`;

  return helpers.fetchApi(url, body);
};

api.addRestaurantInFavList = function(body) {
  const url = `${constants.BASE_URL}/AddRestaurantInFavList`;

  return helpers.fetchApi(url, body);
};

api.getCuisineList = function(body) {
  const url = `${constants.BASE_URL}/GetCuisineList`;

  return helpers.fetchApi(url, body);
};

api.getUserEventList = function(body) {
  const url = `${constants.BASE_URL}/GetUserEventList`;

  return helpers.fetchApi(url, body);
};

api.getCallWaiterOptions = function(body) {
  const url = `${constants.BASE_URL}/GetCallWaiterOptions`;

  return helpers.fetchApi(url, body);
};

api.getRestaurantContactUs = function(body) {
  const url = `${constants.BASE_URL}/GetRestaurantContactUs`;

  return helpers.fetchApi(url, body);
};

api.getUserPastEventList = function(body) {
  const url = `${constants.BASE_URL}/GetUserPastEventList`;

  return helpers.fetchApi(url, body);
};

api.getUserLiveEventList = function(body) {
  const url = `${constants.BASE_URL}/GetUserLiveEventList`;

  return helpers.fetchApi(url, body);
};

api.saveFeedback = function(body) {
  const url = `${constants.BASE_URL}/SaveFeedback`;

  return helpers.fetchApi(url, body);
};

api.appRestroFoodCourtOutletList = function(body) {
  const url = `${constants.BASE_URL}/AppRestroFoodCourtOutletList`;

  return helpers.fetchApi(url, body);
};

api.appFoodCourtListPageTopAds = function(body) {
  const url = `${constants.BASE_URL}/AppFoodCourtListPageTopAds`;

  return helpers.fetchApi(url, body);
};

api.appRestroCategory = function(body) {
  const url = `${constants.BASE_URL}/AppRestroCategory`;

  return helpers.fetchApi(url, body);
};

api.appRestroItemsOfCategoryDept = function(body) {
  const url = `${constants.BASE_URL}/AppRestroItemsOfCategoryDept`;

  return helpers.fetchApi(url, body);
};

api.getRecommandedItems = function(body) {
  const url = `${constants.BASE_URL}/GetRecommandedItems`;

  return helpers.fetchApi(url, body);
};

api.getHappyHoursItems = function(body) {
  const url = `${constants.BASE_URL}/GetHappyHoursItems`;

  return helpers.fetchApi(url, body);
};

api.geocodeAddress = function(body) {
  const url = `${constants.GEOCODE_URL}?latlng=${body.latitude},${
    body.longitude
  }&key=${body.key}`;

  return helpers.fetchApi(url, body);
};

api.getRestroOfferList = function(body) {
  const url = `${constants.BASE_URL}/GetRestroOfferList`;

  return helpers.fetchApi(url, body);
};

api.appRestroMiddleRestroDisAds = function(body) {
  const url = `${constants.BASE_URL}/AppRestroMiddleRestroDisAds`;

  return helpers.fetchApi(url, body);
};

api.appRestroMiddleVegAds = function(body) {
  const url = `${constants.BASE_URL}/AppRestroMiddleVegAds`;

  return helpers.fetchApi(url, body);
};

api.appRestroMiddleCuisinesAds = function(body) {
  const url = `${constants.BASE_URL}/AppRestroMiddleCuisinesAds`;

  return helpers.fetchApi(url, body);
};

api.getRestroListByCuisine = function(body) {
  const url = `${constants.BASE_URL}/GetRestroListByCuisine`;

  return helpers.fetchApi(url, body);
};

api.appRestroUnder100Ad = function(body) {
  const url = `${constants.BASE_URL}/AppRestroUnder100Ad`;

  return helpers.fetchApi(url, body);
};

api.appRestroFiftyPerOffAd = function(body) {
  const url = `${constants.BASE_URL}/AppRestroFiftyPerOffAd`;

  return helpers.fetchApi(url, body);
};

api.appRestroNewRestroAds = function(body) {
  const url = `${constants.BASE_URL}/AppRestroNewRestroAds`;

  return helpers.fetchApi(url, body);
};

api.appRestroBrandAd = function(body) {
  const url = `${constants.BASE_URL}/AppRestroBrandAd`;

  return helpers.fetchApi(url, body);
};

api.restroDepartmentKeyPair = function(body) {
  const url = `${constants.BASE_URL}/RestroDepartmentKeyPair`;

  return helpers.fetchApi(url, body);
};

api.getThirdPartyOfferList = function(body) {
  const url = `${constants.BASE_URL}/GetThirdPartyOfferList`;

  return helpers.fetchApi(url, body);
};

api.appRestroListPageTopAdsData = function(body) {
  const url = `${constants.BASE_URL}/AppRestroListPageTopAdsData`;

  return helpers.fetchApi(url, body);
};

api.appRestroDataByID = function(body) {
  const url = `${constants.BASE_URL}/AppRestroDataByID`;

  return helpers.fetchApi(url, body);
};

api.getRestroTableByDept = function(body) {
  const url = `${constants.BASE_URL}/GetRestroTableByDept`;

  return helpers.fetchApi(url, body);
};

api.setAppUserAddress = function(body) {
  const url = `${constants.BASE_URL}/SetAppUserAddress`;

  return helpers.fetchApi(url, body);
};

api.getAppUserAddresses = function(body) {
  const url = `${constants.BASE_URL}/GetAppUserAddresses`;

  return helpers.fetchApi(url, body);
};

api.getRestroImages = function(body) {
  const url = `${constants.BASE_URL}/GetRestroImages`;

  return helpers.fetchApi(url, body);
};

api.getRestroFeedback = function(body) {
  const url = `${constants.BASE_URL}/GetRestroFeedback`;

  return helpers.fetchApi(url, body);
};

api.getCommonFeatures = function(body) {
  const url = `${constants.BASE_URL}/GetCommonFeatures`;

  return helpers.fetchApi(url, body);
};

api.restroAddNewOrder = function(body) {
  const url = `${constants.BASE_URL}/RestroAddNewOrder`;

  return helpers.fetchApi(url, body);
};

api.getAppRestroDishSearch = function(body) {
  const url = `${constants.BASE_URL}/GetAppRestroDishSearch`;

  return helpers.fetchApi(url, body);
};

api.saveFeedback = function(body) {
  const url = `${constants.BASE_URL}/SaveFeedback`;

  return helpers.fetchApi(url, body);
};

api.pgRedirect = function(body) {
  const url = `http://pikdish.com/v2_api/paytm/pgRedirect.php`;

  return helpers.fetchApi(url, body);
};

api.generateChecksum = function(body) {
  const url = `http://pikdish.com/v2_api/paytm/generateChecksum.php`;

  return helpers.fetchApi(url, body);
};

api.getPGDetails = function(body) {
  const url = `${constants.BASE_URL}/GetPGDetails`;

  return helpers.fetchApi(url, body);
};

export default api;
