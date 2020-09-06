import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';

import api from '../../config/api';
import ErrorBox from '../../components/ErrorBox';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import BlankOrderIndication from '../../components/BlankOrderIndication';
import Order from './Order';
import Header from '../../components/Header';
import CallWaiterModal from '../../components/CallWaiterModal';
import GeneralStyle from '../GeneralStyle';
import style from './style';
import helpers from '../../config/helpers';

class RunningOrders extends Component {
  constructor() {
    super();

    this.handleCallWaiterModalChange = this.handleCallWaiterModalChange.bind(
      this,
    );
    this.navigateBillDetails = this.navigateBillDetails.bind(this);
  }

  state = {
    isCallWaiterModal: false,
    isLoading: false,
    orders: [],
    errorMessage: '',
    callWaiterRestaurantId: '',
  };

  componentDidMount() {
    this.fetchOrders();
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

      this.setState({orders});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  handleCallWaiterModalChange(isCallWaiterModal, restaurantId) {
    this.setState({isCallWaiterModal, callWaiterRestaurantId: restaurantId});
  }

  navigateBillDetails() {
    this.props.navigation.navigate('BillDetails');
  }

  navigateToLogin = () => {
    this.props.navigation.navigate('Login');
  };

  renderLogin = () => {
    const {user} = this.props;

    if (!user) {
      return (
        <View
          style={[
            GeneralStyle.flex1,
            GeneralStyle.alignCenter,
            GeneralStyle.justifyCenter,
          ]}>
          <Button onPress={this.navigateToLogin}>Login</Button>
        </View>
      );
    }
  };

  renderOrder = () => {
    const {user} = this.props;
    const {isLoading, orders} = this.state;

    if (!user) {
      return null;
    }

    if (orders.length) {
      return orders.map(item => (
        <View
          key={Math.random().toString()}
          style={[
            GeneralStyle.flex1,
            GeneralStyle.container,
            GeneralStyle.noMarginTop,
          ]}>
          <Order
            data={item}
            onCallWaiter={this.handleCallWaiterModalChange}
            navigateToBillDetails={this.navigateBillDetails}
          />
        </View>
      ));
    }

    if (!orders.length && !isLoading) {
      return (
        <BlankOrderIndication
          icon={require('../../assets/images/no-running-order.png')}
          onPress={() => this.props.navigation.navigate('Home')}
        />
      );
    }
  };

  render() {
    const {
      isCallWaiterModal,
      isLoading,
      errorMessage,
      callWaiterRestaurantId,
    } = this.state;

    return (
      <View style={GeneralStyle.flex1}>
        <Header headerStyles={style.header}>Running Orders</Header>
        <ScrollView
          contentContainerStyle={GeneralStyle.flexGrow1}
          style={GeneralStyle.backgroundLightGrey}>
          {this.renderLogin()}
          {this.renderOrder()}
        </ScrollView>
        {isCallWaiterModal && (
          <CallWaiterModal
            restaurantId={callWaiterRestaurantId}
            onClose={this.handleCallWaiterModalChange}
            visible={isCallWaiterModal}
          />
        )}
        {isLoading && <Loader />}
        <ErrorBox
          message={errorMessage}
          onClose={() => this.setState({errorMessage: ''})}
        />
      </View>
    );
  }
}

const mapStateToProps = store => ({
  theme: store.theme.appTheme,
  user: store.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RunningOrders);
