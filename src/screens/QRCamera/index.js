import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import helpers from '../../config/helpers';
import selectedRestaurantActions from '../../redux/selectedRestaurant/action';
import cartActions from '../../redux/cart/action';
import api from '../../config/api';
import ErrorBox from '../../components/ErrorBox';
import Loader from '../../components/Loader';
import QR from '../../components/QRCamera';
import DropdownHeader from '../../components/DropdownHeader';
import style from './style';
import GeneralStyle from '../GeneralStyle';
import constants from '../../config/constants';

class QRCamera extends Component {
  constructor() {
    super();

    this.openCamera = this.openCamera.bind(this);
  }

  state = {
    isCamera: true,
    theme: null,
    errorReadingQRCode: false,
    reactivate: true,
  };

  async componentDidMount() {
    // this.fetchOrders();
  }

  fetchOrders = async () => {
    const {theme, user} = this.props;

    if (!user) return;

    try {
      this.setState({isLoading: true});

      const payload = {
        order_by: '1',
        user_id: user.id,
        is_order_complete: '0',
        restaurant_id: '',
        main_restaurant_id: theme.restaurant_id,
      };

      const response = await api.userAllOrders(payload);

      const orders = [];

      if (Array.isArray(response.data)) {
        response.data.map(item => {
          if (!item.OrderH.length) return;

          item.OrderH.map(data => {
            orders.push({...data, restaurant_id: item.restaurant_id});
          });
        });
      }

      const isTableOrder = helpers.isTableOrder(orders);

      this.setState({isTableOrder});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  openCamera() {
    this.setState({isCamera: true});
  }

  navigate(route, additionalParams = {}) {
    const params = this.props.navigation.state.params || {};

    this.props.navigation.navigate(route, {...params, ...additionalParams});
  }

  handleRead = async code => {
    const {user, theme, navigation} = this.props;
    const {orderType} = navigation.state.params;

    try {
      this.setState({isLoading: true});

      const location = await helpers.getLocationWithPermission();

      const payload = {
        hash_value: code.data,
        restaurant_id: theme.restaurant_id,
        user_id: user ? user.id : '0',
        lat: location.latitude,
        lng: location.longitude,
      };

      const response = await api.appReadQRCode(payload);

      this.setState({reactivate: false});

      this.props.clearCart();
      console.log('response.data =>', response.data);
      this.props.setSelectedRestaurant(response.data);
      this.props.setSelectedOrderType(orderType);

      if (response.data.restaurant_type === constants.FOOD_COURT_TYPE) {
        this.navigate('FoodCourt', {restaurant: response.data});
      } else {
        this.navigate('RestaurantWelcomePage', {restaurant: response.data});
      }
    } catch (e) {
      console.log('e =>', e);
      this.setState({message: e.message, errorReadingQRCode: true});
    }

    this.setState({isLoading: false});
  };

  handleErrorButtonPress = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    const {
      isLoading,
      errorMessage,
      errorReadingQRCode,
      isCamera,
      isTableOrder,
      reactivate,
    } = this.state;

    return (
      <View style={GeneralStyle.flex1}>
        <DropdownHeader />
        <View style={GeneralStyle.flex1}>
          <View style={[GeneralStyle.flex1, {alignItems: 'center'}]}>
            <Image
              resizeMode="cover"
              style={GeneralStyle.flex1}
              source={require('../../assets/images/restaurant.gif')}
            />
          </View>
          <View style={style.cameraContainer}>
            {isCamera &&
              (!isTableOrder ? (
                <View>
                  <QR reactivate={true} onRead={this.handleRead} />
                  {errorReadingQRCode && (
                    <View style={style.errorContainer}>
                      <Text style={style.error}>Invalid QR-Code!!</Text>
                    </View>
                  )}
                </View>
              ) : (
                <QRMessageBox message="You already have running table order" />
              ))}
          </View>
        </View>

        <View style={style.messageBox}>
          {errorReadingQRCode ? (
            <QRError onPress={this.handleErrorButtonPress} />
          ) : !isTableOrder ? (
            <Text style={style.message}>Scan the QR Code</Text>
          ) : null}
        </View>
        {isLoading && <Loader />}
        <ErrorBox
          onClose={() => this.setState({errorMessage: ''})}
          message={errorMessage}
        />
      </View>
    );
  }
}

const mapStateToProps = store => ({
  user: store.auth.user,
  theme: store.theme.appTheme,
});

const mapDispatchToProps = {
  clearCart: cartActions.clearCart,
  setSelectedRestaurant: selectedRestaurantActions.setSelectedRestaurant,
  setSelectedOrderType: selectedRestaurantActions.setSelectedOrderType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QRCamera);

function QRError(props) {
  return (
    <>
      {/* <Text style={style.error}>Invalid QR-Code!!</Text> */}
      <TouchableOpacity onPress={props.onPress} style={style.exploreContainer}>
        <Text style={style.exploreText}>Explore Menu</Text>
        <Image
          resizeMode="cover"
          style={style.rightArrowIcon}
          source={require('../../assets/icon/right-arrow-light.png')}
        />
      </TouchableOpacity>
    </>
  );
}

function QRMessageBox(props) {
  return (
    <View style={[style.cameraArea, {width: '100%', height: '100%'}]}>
      <Text style={style.cameraText}>{props.message}</Text>
    </View>
  );
}
