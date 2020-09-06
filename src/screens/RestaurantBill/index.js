import React, {Component} from 'react';
import {View, Text, ScrollView, Image, TextInput} from 'react-native';
import {connect} from 'react-redux';

import api from '../../config/api';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import helpers from '../../config/helpers';
// import OrderNow from './OrderNow';
import PaySnippet from './PaySnippet';
import Header from '../../components/Header';
import ScreenHeader from './Header';
import GeneralStyle from '../GeneralStyle';
import style from './style';

class RestaurantBill extends Component {
  state = {
    allItems: [],
    chefNote: '',
    selectedTip: '',
    selectedDonation: '',
  };

  componentDidMount() {
    this.simplifyItems();
  }

  simplifyItems = () => {
    const {cart, items} = this.props;
    const allItems = [];

    items.forEach(item => {
      if (Array.isArray(item.item)) {
        item.item.forEach(item2 => {
          const isFound = cart.order_items.find(
            a => a.rest_item_id === item2.id,
          );

          if (isFound) {
            allItems.push({...item2, qty: isFound.qty});
          }
        });
      }

      const isFound = cart.order_items.find(a => a.rest_item_id === item.id);

      if (isFound) {
        allItems.push({...item, qty: isFound.qty});
      }
    });

    this.setState({allItems});
  };

  handleOnPay = async () => {
    const {user, restaurant, orderType, cart} = this.props;
    const {
      selectedTip,
      selectedDonation,
      chefNote,
      pickupTime,
      arrivalTime,
      numberOfPeople,
    } = this.state;

    try {
      this.setState({isLoading: true});

      const payload = {
        user_id: user.id,
        restaurant_id: restaurant.id,
        order_type: orderType,
        order_method: '1',
        cust_name: user.name,
        cust_mobile_no: user.mobile_no,
        restaurant_table_id: '7',
        reach_time: arrivalTime || '',
        no_of_seats: numberOfPeople || '',
        delivery_address: '',
        landmark: '',
        address_lat: '',
        address_long: '',
        coupon_code: '',
        delivery_charges: '',
        redeem_point_use: '',
        redeem_point_value: '',
        coupon_amt: '',
        order_items: cart.order_items,
        chef_note: chefNote,
        tip_for_waiter: selectedTip,
        donation_for_ngo: selectedDonation,
        packing_charges: '0',
        is_happy_hours: restaurant.is_happy_hours,
        separated_app_id: '0',
        disount: '0',
        disount_type: '0',
        user_waiter_id: '0',
      };

      const response = await api.restroAddNewOrder(payload);

      this.setState({isLoading: false});

      this.props.navigation.navigate('PlaceOrder');

      // if (orderType === constants.DELIVERY_TYPE) {
      //   return this.props.navigation.navigate('DeliveryAddress', {
      //     bill: this.getBill(),
      //   });
      // }

      // this.props.navigation.navigate('PaymentOptions', {
      //   bill: this.getBill(),
      // });
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  render() {
    const {allItems, isLoading, errorMessage} = this.state;
    const {restaurant, selectedTable, cart, orderType} = this.props;
    const extraCharges = [];

    return (
      <View style={GeneralStyle.flex1}>
        <Header>Restaurant Bill</Header>
        <ScrollView
          style={[GeneralStyle.flex1]}
          contentContainerStyle={GeneralStyle.flexGrow1}>
          <View style={[GeneralStyle.container, style.container]}>
            <View style={style.content}>
              <ScreenHeader
                selectedTable={selectedTable}
                restaurant={restaurant}
              />
              {cart.order_items.map(item => (
                <View style={style.itemContainer}>
                  <Text style={style.item}>{item.item_name}</Text>
                  <Text style={style.amount}>
                    {helpers.getPrice(item, restaurant, item.rest_portion_id)}
                  </Text>
                </View>
              ))}
            </View>
            <View style={style.noteContainer}>
              <Text style={style.note}>Note:</Text>
              <View style={style.feedbackInputContainer}>
                <TextInput
                  onChangeText={chefNote => this.setState({chefNote})}
                  multiline={true}
                  placeholder="Chef Note"
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <PaySnippet
          onPay={this.handleOnPay}
          bill={helpers.calculateBill(
            allItems,
            restaurant,
            orderType,
            extraCharges,
            cart.order_items,
          )}
        />
        {/* <OrderNow /> */}
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
  restaurant: store.auth.restaurant || {},
  selectedTable: store.table.selectedTable,
  selectedDepartment: store.table.selectedDepartment,
  selectedCategory: store.table.selectedCategory,
  user: store.auth.user,
  cart: store.cart.cart,
  items: store.selectedRestaurant.items,
  orderType: store.selectedRestaurant.orderType,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantBill);
