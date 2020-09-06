import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import WebView from 'react-native-webview';
import paymentHTML from './paymentHTML';

import restaurantActions from '../../redux/restaurant/action';
import ErrorBox from '../../components/ErrorBox';
import Loader from '../../components/Loader';
import constants from '../../config/constants';
import Header from '../../components/Header';
import PaymentButton from './PaymentButton';
import GeneralStyle from '../GeneralStyle';
import style from './style';
import api from '../../config/api';

class PaymentOptions extends Component {
  state = {
    errorMessage: '',
    isWebview: false,
    transactionData: null,
  };

  runTransaction(detailsPayload) {
    const {user = {}} = this.props;

    const callbackUrl = `https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=${
      detailsPayload.orderId
    }`;

    const details = {
      mode: 'Production', // 'Staging' or 'Production'
      MID: detailsPayload.mid,
      INDUSTRY_TYPE_ID: 'Retail109',
      WEBSITE: 'APPPROD',
      CHANNEL_ID: 'WAP',
      TXN_AMOUNT: parseFloat(detailsPayload.amount)
        .toFixed(2)
        .toString(),
      ORDER_ID: detailsPayload.orderId,
      EMAIL: 'soni.dshikha@gmail.com',
      MOBILE_NO: '9950007117',
      CUST_ID: user.id || '',
      CHECKSUMHASH: detailsPayload.hash,
      CALLBACK_URL: callbackUrl,
      // MERC_UNQ_REF: '',
    };

    console.log('details =>', details);

  }

  navigate(route) {
    this.props.navigation.navigate(route);
  }

  handlePayment = type => {
    if (type === 'paytm') {
      this.handlePaytm();
    }
  };

  handlePaytm = async () => {
    try {
      const {navigation, user, theme} = this.props;
      const {state = {}} = navigation;
      const {params = {}} = state;

      this.setState({isLoading: true});

      const pgDetailsPayload = {
        restaurant_id: theme.restaurant_id,
      };
      const mid = await api.getPGDetails(pgDetailsPayload);
      console.log('mid =>', mid);

      const callbackUrl = `https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=${'a1a' +
        params.orderId.toString()}`;

      const pgRedirectPayload = {
        MID: mid.pg[1].merchant_id,
        ORDER_ID: 'a1a' + params.orderId.toString(),
        CUST_ID: user.id || '',
        INDUSTRY_TYPE_ID: 'Retail109',
        CHANNEL_ID: 'WAP',
        TXN_AMOUNT: parseFloat(params.bill.totalBill)
          .toFixed(2)
          .toString(),
        WEBSITE: 'APPPROD',
        CALLBACK_URL: callbackUrl,
        // mode: 'Production', // 'Staging' or 'Production'
      };

      const hash = await api.pgRedirect(pgRedirectPayload);

      console.log('pgRedirectPayload =>', pgRedirectPayload);
      console.log('hash =>', hash);
      console.log('mid =>', mid);
      const detailsPayload = {
        orderId: 'a1a' + params.orderId.toString(),
        mid: mid.pg[1].merchant_id,
        amount: Number(parseFloat(params.bill.totalBill)).toString(),
        hash,
      };

      const transactionData = {
        redirectUrl: 'https://securegw.paytm.in/order/process',
        fields: [
          {
            label: 'MID',
            value: mid.pg[1].merchant_id,
          },
          {
            label: 'WEBSITE',
            value: 'APPPROD',
          },
          {
            label: 'ORDER_ID',
            value: 'a1a' + params.orderId.toString(),
          },
          {
            label: 'CUST_ID',
            value: user.id,
          },
          {
            label: 'MOBILE_NO',
            value: '9950007117',
          },
          {
            label: 'EMAIL',
            value: 'soni.dshikha@gmail.com',
          },
          {
            label: 'INDUSTRY_TYPE_ID',
            value: 'Retail109',
          },
          {
            label: 'CHANNEL_ID',
            value: 'WAP',
          },
          {
            label: 'TXN_AMOUNT',
            value: parseFloat(params.bill.totalBill)
              .toFixed(2)
              .toString(),
          },
          {
            label: 'CALLBACK_URL',
            value: callbackUrl,
          },
          {
            label: 'CHECKSUMHASH',
            value: hash,
          },
        ],
      };

      this.setState({transactionData});
      // this.runTransaction(detailsPayload);
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  navigateToFeedback = () => {
    this.props.setRestaurant(this.props.restaurant);
    this.props.navigation.navigate('Feedback');
  };

  render() {
    const {isLoading, errorMessage} = this.state;
    const {navigation, orderType} = this.props;
    const {state = {}} = navigation;
    const {params = {}} = state;

    const data = {
      redirectUrl: 'https://pikdish-test.herokuapp.com/test',
      fields: [
        {
          label: 'MID',
          value: 'Some random MID',
        },
        {
          label: 'SUM',
          value: 'some values',
        },
      ],
    };

    if (this.state.transactionData) {
      console.log('this.state.transactionData =>', this.state.transactionData);
      console.log(
        'paymentHTML.generateHTML(this.state.transactionData) =>',
        paymentHTML.generateHTML(this.state.transactionData),
      );
    }

    return (
      <View style={GeneralStyle.flex1}>
        <Header>Payment Options</Header>
        <ScrollView
          style={[GeneralStyle.flex1, GeneralStyle.backgroundLightGrey]}>
          {this.state.transactionData ? (
            <WebView
              style={{height: 700, width: '100%'}}
              originWhitelist={['*']}
              source={{
                html: paymentHTML.generateHTML(this.state.transactionData),
              }}
              onNavigationStateChange={newstate => {
                console.log('newstate =>', newstate);
                if (
                  newstate &&
                  newstate.url.startsWith(
                    'https://securegw.paytm.in/theia/paytmCallback',
                  )
                ) {
                  this.setState({transactionData: null});
                }
              }}
            />
          ) : (
            <View style={[GeneralStyle.container, GeneralStyle.noMarginTop]}>
              <View style={style.payableContainer}>
                <Text style={style.payableLabel}>Payable Amount</Text>
                <Text style={style.payableAmount}>
                  ₹ {params.bill.totalBill}
                </Text>
              </View>
              <View style={GeneralStyle.mediumMarginTop}>
                {orderType === constants.TABLE_ORDER_TYPE && (
                  <PaymentButton
                    onPress={this.navigateToFeedback}
                    note="Please keep exact change handy to help us serve you better"
                    iconText="Cash"
                    icon={require('../../assets/icon/cash.png')}
                  />
                )}
                {orderType === constants.TABLE_ORDER_TYPE && (
                  <PaymentButton
                    onPress={this.navigateToFeedback}
                    // note="Please keep exact change handy to help us serve you better"
                    iconText="Swipe Machine"
                    // icon={require('../../assets/icon/cash.png')}
                  />
                )}
                <PaymentButton
                  onPress={() => this.handlePayment('paytm')}
                  iconStyles={style.paytmIconStyle}
                  icon={require('../../assets/icon/paytm.png')}
                />
                <PaymentButton
                  onPress={() => this.props.navigation.navigate('Feedback')}
                  iconStyles={style.payumoneyStyle}
                  icon={require('../../assets/icon/payumoney.png')}
                />
              </View>
            </View>
          )}
        </ScrollView>
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
  orderType: store.selectedRestaurant.orderType,
  restaurant: store.selectedRestaurant.restaurant,
  user: store.auth.user,
  theme: store.theme.appTheme,
});

const mapDispatchToProps = {
  setRestaurant: restaurantActions.setRestaurant,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentOptions);
