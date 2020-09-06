import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import api from '../../config/api';
import helpers from '../../config/helpers';
import RestaurantDetailsHeader from '../../components/RestaurantDetailsHeader';
import CheckoutModal from '../../components/CheckoutModal';
import RadioButton from '../../components/RadioButton';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';
import RestaurantBill from '../../components/RestaurantBill';
import CustomizePopup from '../../components/CustomizePopup';
import Header from '../../components/Header';
import GeneralStyle from '../GeneralStyle';
import style from './style';
import ItemList from './ItemList';
import colors from '../../config/colors';
import constants from '../../config/constants';

class ViewCart extends Component {
  state = {
    selectedTip: '',
    selectedDonation: '',
    isReferralModal: false,
    products: [
      {id: 1, name: 'Sandwich Dhokla 1', price: 24, plate: 1, amount: 3},
      {id: 2, name: 'Sandwich Dhokla 2', price: 24, plate: 1, amount: 5},
      {id: 3, name: 'Sandwich Dhokla 3', price: 24, plate: 1, amount: 2},
    ],
    isCheckoutModal: false,
    isPickup: false,
    tipWaiter: false,
    donateNGO: false,
    allItems: [],
    chefNote: '',
    isLoading: false,
    errorMessage: '',
    arrivalTime: '',
    pickupTime: '',
    numberOfPeople: '',
  };

  constructor() {
    super();

    this.handleReferralModalChange = this.handleReferralModalChange.bind(this);
    this.handlePlus = this.handlePlus.bind(this);
    this.handleSubtract = this.handleSubtract.bind(this);
  }

  componentDidMount() {
    this.simplifyItems();
  }

  simplifyItems = () => {
    const {cart, items} = this.props;
    const allItems = [];

    items.forEach(item => {
      item.item.forEach(item2 => {
        const isFound = cart.order_items.find(a => a.rest_item_id === item2.id);

        if (isFound) {
          allItems.push({...item2, qty: isFound.qty});
        }
      });
    });

    this.setState({allItems});
  };

  handlePlus(amount, id) {
    const {products} = this.state;
    const index = products.findIndex(item => item.id === id);

    products[index].amount = amount;

    this.setState({products});
  }

  getPackageCharges = () => {
    const {allItems} = this.state;
    const {restaurant} = this.props;
    let packingCharges = restaurant.packing_charges;

    if (restaurant.is_fix_packing_charges === '1') {
      packingCharges = allItems.reduce((acc, item) => {
        return Number(item.packing_charges) + acc;
      }, 0);
    }

    return packingCharges;
  };

  getDeliveryCharges = () => {
    const {restaurant} = this.props;

    return restaurant.delivery_charges;
  };

  handleSubtract(amount, id) {
    const {products} = this.state;
    const index = products.findIndex(item => item.id === id);

    if (amount < 1) {
      products.splice(index, 1);
    } else {
      products[index].amount = amount;
    }

    this.setState({products});
  }

  handleReferralModalChange(isReferralModal, item) {
    this.setState({isReferralModal, customizingItem: item});
  }

  tip(selectedTip) {
    this.setState({selectedTip});
  }

  donation(selectedDonation) {
    this.setState({selectedDonation});
  }

  renderProducts() {
    const {cart, restaurant, items} = this.props;

    return cart.order_items.map((item, i) => {
      let foundItem = '';

      items.map(a => {
        const c = a.item.find(b => {
          return b.id === item.rest_item_id;
        });

        if (c) {
          foundItem = c;
        }
      });

      return (
        <ItemList
          key={i}
          onPlus={this.handlePlus}
          onSubtract={this.handleSubtract}
          data={item}
          fullData={foundItem}
          restaurant={restaurant}
          onCustomizePress={() =>
            this.handleReferralModalChange(true, foundItem)
          }
        />
      );
    });
  }

  handlePayNow = async () => {
    const {orderType} = this.props;
    // if (!this.props.navigation.state.params)
    //   return this.props.navigation.navigate('PaymentOptions');

    // const type = this.props.navigation.state.params.type;

    if (orderType === constants.TABLE_ORDER_TYPE) {
      this.addNewOrder();
      // this.props.navigation.navigate('PaymentOptions');
    } else if (orderType === constants.PRE_ORDER_TYPE) {
      this.setState({isPickup: false, isCheckoutModal: true});
    } else if (orderType === constants.TAKE_AWAY_TYPE) {
      this.setState({isPickup: true, isCheckoutModal: true});
    } else if (orderType === constants.DELIVERY_TYPE) {
      this.props.navigation.navigate('DeliveryAddress');
    }
  };

  handleCheckoutModalChange = (_, payload) => {
    this.setState(
      {
        numberOfPeople: payload.numberOfPeople,
        arrivalTime: payload.arrivalTime,
        pickupTime: payload.pickupTime,
        isCheckoutModal: false,
      },
      () => this.addNewOrder(),
    );
  };

  toggleNGO = () => {
    this.setState({donateNGO: !this.state.donateNGO});
  };

  toggleWaiter = () => {
    this.setState({tipWaiter: !this.state.tipWaiter});
  };

  returnButtonLabel = () => {
    const {orderType, location} = this.props;
    let label = 'Pay now';

    if (
      orderType === constants.PRE_ORDER_TYPE &&
      orderType === constants.TAKE_AWAY_TYPE
    ) {
      label = 'Order Now';
    }

    if (orderType === constants.DELIVERY_TYPE) {
      label = 'Set Address';
    }

    // if (orderType === constants.DELIVERY_TYPE && !location) {
    //   label = 'Set Address';
    // }
    // if (orderType === constants.DELIVERY_TYPE && location) {
    //   label = 'Pay now';
    // }

    return label;
  };

  handleTipWaiterChange = value => {
    const {selectedTip} = this.state;

    if (!selectedTip) {
      return this.tip(10);
    }

    this.setState({selectedTip: ''});
  };

  handleDonateNGOChange = value => {
    const {selectedDonation} = this.state;

    if (!selectedDonation) {
      return this.donation(10);
    }

    this.setState({selectedDonation: ''});
  };

  // getTax = () => {
  //   const {restaurant} = this.props;
  //   const {allItems} = this.state;
  // };

  getBill = () => {
    const {allItems, selectedTip, selectedDonation} = this.state;
    const {restaurant, cart} = this.props;
    const {orderType} = this.props;
    const extraCharges = [];

    if (selectedTip) {
      extraCharges.push(selectedTip);
    }

    if (selectedDonation) {
      extraCharges.push(selectedDonation);
    }

    return helpers.calculateBill(
      allItems,
      restaurant,
      orderType,
      extraCharges,
      cart.order_items,
    );
  };

  handleLogin = () => {
    this.props.navigation.navigate('Login', {fromCart: true});
  };

  addNewOrder = async () => {
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
        restaurant_id: restaurant.id || restaurant.restaurant_id,
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

      console.log('payload =>', payload);
      const response = await api.restroAddNewOrder(payload);

      this.setState({isLoading: false});

      console.log('response =>', response);

      if (orderType === constants.DELIVERY_TYPE) {
        return this.props.navigation.navigate('DeliveryAddress', {
          bill: this.getBill(),
          orderId: response.list,
        });
      }

      this.props.navigation.navigate('PaymentOptions', {
        bill: this.getBill(),
        orderId: response.list,
      });
    } catch (e) {
      alert(e.message);
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  handleChange = e => {
    this.setState({chefNote: e});
  };

  render() {
    const {restaurant, cart, orderType, user, errorMessage, selectedRestaurant} = this.props;
    const {
      selectedTip,
      selectedDonation,
      isReferralModal,
      isCheckoutModal,
      isPickup,
      allItems,
      isLoading,
      chefNote,
    } = this.state;

    const extraCharges = [];

    if (selectedTip) {
      extraCharges.push(selectedTip);
    }

    if (selectedDonation) {
      extraCharges.push(selectedDonation);
    }

    return (
      <View style={GeneralStyle.flex1}>
        <Header headerStyles={style.header}>View Cart</Header>
        <ScrollView style={GeneralStyle.backgroundLightGrey}>
          <View
            style={[
              GeneralStyle.flex1,
              GeneralStyle.container,
              GeneralStyle.noMarginTop,
              {paddingBottom: 0},
            ]}>
            <RestaurantDetailsHeader
              containerStyles={{borderBottomWidth: 0}}
              restaurant={selectedRestaurant}
            />
            <View style={style.itemContainer}>{this.renderProducts()}</View>
            <View style={style.noteContainer}>
              <TextInput
                value={chefNote}
                onChangeText={this.handleChange}
                style={style.note}
                placeholder="Note for chef"
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Offers', {fromCart: true})
            }>
            <View style={style.applyCouponContainer}>
              <Image
                style={style.discountIcon}
                source={require('../../assets/icon/discount.png')}
              />
              <Text style={style.applyText}>APPLY COUPON</Text>
              <Image
                style={style.arrowIcon}
                source={require('../../assets/icon/arrow-right-red.png')}
              />
            </View>
          </TouchableOpacity>
          <View style={GeneralStyle.mediumMarginTop}>
            <RestaurantBill bill={this.getBill()} />
          </View>
          <View style={style.tipContainer}>
            <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
              <Checkbox
                onChange={this.handleTipWaiterChange}
                checked={selectedTip}
                activeColor={colors.GREEN}
                label="Tip for waiter"
                containerStyle={{borderRadius: 0}}
              />
            </View>
            <View style={style.radioContainer}>
              <RadioButton
                onSelect={this.tip.bind(this, 10)}
                containerStyle={style.radio}
                label="₹10"
                selected={selectedTip === 10}
              />
              <RadioButton
                onSelect={this.tip.bind(this, 20)}
                containerStyle={style.radio}
                label="₹20"
                selected={selectedTip === 20}
              />
              <RadioButton
                onSelect={this.tip.bind(this, 50)}
                containerStyle={style.radio}
                label="₹50"
                selected={selectedTip === 50}
              />
              <RadioButton
                onSelect={this.tip.bind(this, 100)}
                containerStyle={style.radio}
                label="₹100"
                selected={selectedTip === 100}
              />
            </View>
          </View>
          <View style={style.ngoContainer}>
            <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
              <Checkbox
                checked={selectedDonation}
                onChange={this.handleDonateNGOChange}
                activeColor={colors.GREEN}
                containerStyle={{borderRadius: 0}}
                label="Donate for NGO"
              />
            </View>
            <View style={style.radioContainer}>
              <RadioButton
                onSelect={this.donation.bind(this, 10)}
                containerStyle={style.radio}
                label="₹10"
                selected={selectedDonation === 10}
              />
              <RadioButton
                onSelect={this.donation.bind(this, 20)}
                containerStyle={style.radio}
                label="₹20"
                selected={selectedDonation === 20}
              />
              <RadioButton
                onSelect={this.donation.bind(this, 50)}
                containerStyle={style.radio}
                label="₹50"
                selected={selectedDonation === 50}
              />
              <RadioButton
                onSelect={this.donation.bind(this, 100)}
                containerStyle={style.radio}
                label="₹100"
                selected={selectedDonation === 100}
              />
            </View>
          </View>
          <View style={style.billContainer}>
            <View style={style.billDetails}>
              <TouchableOpacity>
                <Text style={style.bill}>
                  ₹
                  {
                    helpers.calculateBill(
                      allItems,
                      restaurant,
                      orderType,
                      extraCharges,
                      this.props.cart.order_items,
                    ).totalBill
                  }
                </Text>
                <Text style={style.detailBill}>Detailed Bill</Text>
              </TouchableOpacity>
            </View>
            {user ? (
              <Button onPress={this.handlePayNow} buttonStyles={{marginTop: 0}}>
                {this.returnButtonLabel()}
              </Button>
            ) : (
              <Button onPress={this.handleLogin} buttonStyles={{marginTop: 0}}>
                Login
              </Button>
            )}
          </View>
        </ScrollView>
        <CustomizePopup
          data={this.state.customizingItem}
          onClose={this.handleReferralModalChange}
          visible={isReferralModal}
        />
        <CheckoutModal
          isPickup={isPickup}
          visible={isCheckoutModal}
          onClose={this.handleCheckoutModalChange}
        />
        {isLoading && <Loader />}
        <ErrorBox
          message={errorMessage}
          onClose={() => this.setState({errorMessage: ''})}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  location: state.auth.location,
  user: state.auth.user,
  restaurant: state.cart.restaurant,
  selectedRestaurant: state.selectedRestaurant.restaurant,
  cart: state.cart.cart,
  items: state.selectedRestaurant.items,
  orderType: state.selectedRestaurant.orderType,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewCart);
// export default ViewCart;
