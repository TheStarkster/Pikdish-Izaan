import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import AppDescription from '../screens/AppDescription';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Verification from '../screens/Verification';
import ForgotPassword from '../screens/ForgotPassword';
import TermsCondition from '../screens/TermsCondition';
import Feedback from '../screens/Feedback';
import EditProfile from '../screens/EditProfile';
import RestaurantDetail from '../screens/RestaurantDetail';
import RestaurantListing from '../screens/RestaurantListing';
import RestaurantListingAds from '../screens/RestaurantListingAds';
import RestaurantListingCuisines from '../screens/RestaurantListingCuisines';
import AppFeedback from '../screens/AppFeedback';
import EventsListPage from '../screens/EventsListPage';
import DeliveryAddress from '../screens/DeliveryAddress';
import SearchLocation from '../screens/SearchLocation';
import BookTable from '../screens/BookTable';
import FavouriteRestaurants from '../screens/FavouriteRestaurants';
import TableBookingPage from '../screens/TableBookingPage';

// import SearchItems from '../screens/SearchItems';
import Offers from '../screens/Offers';
import Tabs from './TabNav';
import RestaurantItems from '../screens/RestaurantItems';
import PaymentOptions from '../screens/PaymentOptions';
import FoodCourt from '../screens/FoodCourt';
import ContactUs from '../screens/ContactUs';
import OrderHistory from '../screens/OrderHistory';
import BillDetails from '../screens/BillDetails';
import EventDetailPage from '../screens/EventDetailPage';
import Dashboard from '../screens/Dashboard';
import Dishes from '../screens/Dishes';
import RestaurantBill from '../screens/RestaurantBill';
import PlaceOrder from '../screens/PlaceOrder';
import ViewCart from '../screens/ViewCart';
import Wallet from '../screens/Wallet';
import YourEvents from '../screens/YourEvents';
import ChangePin from '../screens/ChangePin';
import SelectDepartment from '../screens/SelectDepartment';

const options = {
  initialRouteName: 'AppDescription',
  headerMode: 'none',
};

const AppNavigator = createStackNavigator(
  {
    AppDescription,
    Login,
    Register,
    Verification,
    ForgotPassword,
    TermsCondition,
    Main: Tabs,
    RestaurantItems,
    FoodCourt,
    PaymentOptions,
    Feedback,
    EditProfile,
    RestaurantDetail,
    ContactUs,
    OrderHistory,
    BillDetails,
    RestaurantListing,
    AppFeedback,
    EventsListPage,
    DeliveryAddress,
    EventDetailPage,
    Dashboard,
    SearchLocation,
    BookTable,
    Dishes,
    RestaurantBill,
    PlaceOrder,
    ViewCart,
    FavouriteRestaurants,
    Wallet,
    YourEvents,
    ChangePin,
    SelectDepartment,
    RestaurantListingAds,
    RestaurantListingCuisines,
    TableBookingPage,
    Offers
  },
  options,
);

export default createAppContainer(AppNavigator);
