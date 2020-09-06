import React, {Component} from 'react';
import {Text, View, BackHandler} from 'react-native';
import styles from './style';
import {connect} from 'react-redux';

import constants from '../../config/constants';
import api from '../../config/api';
import GeneralStyle from '../GeneralStyle';
import Tab from '../../components/Tab';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import Header from '../../components/Header';
import RestaurantOffers from './RestaurantOffers';
import Coupans from './Coupans';

class Offers extends Component {
  state = {
    rightLineBorder: false,
    active: 'offer',
    fromCart: false,
    offers: [],
    coupons: [],
  };

  changeTab(active) {
    this.setState({active});
  }

  async componentDidMount() {
    const {navigation} = this.props;

    this.setState({isLoading: true});

    const promises = [this.fetchOffers(), this.fetchCoupons()];

    await Promise.all(promises);

    this.setState({isLoading: false});

    const fromCart =
      navigation.state &&
      navigation.state.params &&
      navigation.state.params.fromCart;

    if (fromCart) {
      return this.setState({fromCart, active: 'coupon'});
    }
  }

  fetchOffers = async () => {
    const {user, theme} = this.props;

    try {
      const payload = {
        restaurant_id: theme.restaurant_id,
        user_id: user ? user.id : '0',
      };

      const response = await api.getRestroOfferList(payload);
      console.log('offers =>', response.offer);
      this.setState({offers: response.offer});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    return {message: 'success'};
  };

  fetchCoupons = async () => {
    const {user, theme} = this.props;

    try {
      const payload = {
        restaurant_id: theme.restaurant_id,
      };

      const response = await api.getThirdPartyOfferList(payload);

      this.setState({coupons: response.offer});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    return {message: 'success'};
  };

  renderTab = () => {
    const {offers, coupons, active} = this.state;

    const el = [];

    if (offers.length) {
      el.push(
        <Tab
          active={active === 'offer'}
          onPress={this.changeTab.bind(this, 'offer')}>
          Restaurant Offers
        </Tab>,
      );
    }

    if (coupons.length) {
      el.push(
        <Tab
          labelStyles={GeneralStyle.textRight}
          active={active === 'coupon'}
          onPress={this.changeTab.bind(this, 'coupon')}>
          Payment offers/coupons
        </Tab>,
      );
    }

    if (!offers.length || !coupons.length) {
      el.push(
        <View
          style={[
            GeneralStyle.flex1,
            {marginHorizontal: constants.MARGIN_X_SMALL},
          ]}
        />,
      );
    }

    return el;
  };

  render() {
    const {active, isLoading, errorMessage, offers, coupons} = this.state;

    return (
      <View style={GeneralStyle.flex1}>
        <Header>Offers</Header>
        {offers.length || coupons.length ? (
          <View style={styles.offersContainer}>
            {!isLoading && !this.state.fromCart && (
              <View style={styles.offersTabBar}>{this.renderTab()}</View>
            )}
            {active === 'coupon' ? (
              <Coupans />
            ) : (
              <RestaurantOffers offers={offers} />
            )}
          </View>
        ) : (
          <View style={styles.noCouponContainer}>
            <Text style={styles.noCouponText}>No Offer or Coupon found</Text>
          </View>
        )}
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

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Offers);
