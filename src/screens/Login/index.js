import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

import helpers from '../../config/helpers';
import authAction from '../../redux/auth/action';
import api from '../../config/api';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import ErrorBox from '../../components/ErrorBox';
// import SocialButton from '../../components/SocialButton';
import GeneralStyle from '../GeneralStyle';
import style from './style';

class Login extends Component {
  state = {
    mobile: '',
    password: '',
    theme: null,
    errorMessage: '',
    isLoading: false,
    country: null,
    errors: {},
  };

  componentDidMount() {
    const {navigation} = this.props;
    const {state = {}} = navigation;
    const {params = {}} = state;

    this.setState({fromCart: params.fromCart});
  }

  componentDidUpdate(prevProps) {
    const {state: prevState = {}} = prevProps.navigation;
    const {params: prevParams = {}} = prevState;
    const {state = {}} = this.props.navigation;
    const {params = {}} = state;

    if (prevParams.fromCart !== params.fromCart) {
      this.setState({fromCart: params.fromCart});
    }
  }

  navigate(route) {
    this.props.navigation.navigate(route);
  }

  navigateAndReset(route, params = {}) {
    this.props.navigation.dispatch(helpers.getStackReseter(route, params));
  }

  handleChange(type, e) {
    if (type === 'mobile' || type === 'password') {
      if (!isNaN(e)) {
        return this.setState({[type]: e});
      }
    } else {
      this.setState({[type]: e});
    }
  }

  login = async () => {
    try {
      if (this.validate()) return;

      this.setState({isLoading: true});

      const {mobile, password} = this.state;

      const payload = {
        mobile_no: mobile,
        password: password,
        user_type: '',
        fcm_token: 1,
      };

      const response = await api.login(payload);
      const user = response.user;
      user.profilePic = user.user_pic ? user.user_pic_path + user.user_pic : '';
      user.defaultPic = user.user_pic_path + 'no-user.png';

      if (user.user_type === '3' || user.user_type === '2') {
        const response = await this.fetchRestaurant(user);

        const rest = response.restro || [];

        this.props.setUserRestaurant(rest[0]);
      }

      const runningOrders = await this.fetchRunningOrders(user);

      this.props.setUser(user);

      if (this.state.fromCart) {
        return this.navigate('ViewCart');
      }

      if (
        user.user_type === '0' ||
        user.user_type === '1' ||
        user.user_type === '5'
      ) {
        this.navigateAndReset('Main', {orders: runningOrders});
      } else if (user.user_type === '2' || user.user_type === '4') {
        this.navigateAndReset('Dashboard');
      } else if (user.user_type === '3') {
        this.navigateAndReset('Main');
        // this.navigateAndReset('BookTable');
      }
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  fetchRestaurant = async user => {
    try {
      const payload = {
        restaurant_id: user.team_restaurant_id,
        order_type: '1',
        user_id: user.id,
        cuisine_id: '',
      };

      const response = await api.appRestroDataByID(payload);

      return response;
    } catch (e) {
      throw e;
    }
  };

  fetchRunningOrders = async user => {
    const {appTheme: theme} = this.props;

    try {
      const payload = {
        order_by: '1',
        user_id: user.id,
        is_order_complete: '0',
        restaurant_id: '',
        main_restaurant_id: theme.restaurant_id,
      };

      const response = await api.userAllOrders(payload);

      const orders = [];

      if (!Array.isArray(response.data)) return orders;

      response.data.map(item => {
        if (!item.OrderH.length) return;

        item.OrderH.map(data => {
          orders.push({...data, restaurant_id: item.restaurant_id});
        });
      });

      return orders;
    } catch (e) {
      throw e;
    }
  };

  validate = () => {
    const errors = {};

    if (!this.state.mobile || this.state.mobile.length < 10) {
      errors.mobile = 'Mobile Number should be 10 digits';
    }

    if (!this.state.password || this.state.password.length < 6) {
      errors.password = 'Password should be 6 digits';
    }

    this.setState({errors});

    return Object.keys(errors).length;
  };

  render() {
    const {mobile, password, errorMessage, isLoading, errors} = this.state;

    const {appTheme: theme, country} = this.props;

    return (
      <View style={GeneralStyle.flex1}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={[GeneralStyle.flex1]}
          contentContainerStyle={GeneralStyle.minHeight100}>
          <StatusBar
            barStyle="dark-content"
            networkActivityIndicatorVisible={true}
            backgroundColor="white"
            translucent={false}
          />
          <View
            style={[
              GeneralStyle.container,
              GeneralStyle.noMarginTop,
              GeneralStyle.minHeight100,
            ]}>
            <View style={[style.topContainer]}>
              <Image
                resizeMode="contain"
                style={style.logo}
                source={{uri: theme.exp_image_path + '/' + theme.logo_pic}}
              />
            </View>
            <View style={[GeneralStyle.flex1]}>
              <Text style={style.welcomeHeading}>Welcome,</Text>
              <Text style={[style.label, GeneralStyle.smallMarginTop]}>
                Sign in to Continue
              </Text>
              <View style={style.form}>
                <Input
                  error={errors.mobile}
                  value={mobile}
                  accept="numbers"
                  containerStyle={GeneralStyle.flex1}
                  onChangeText={this.handleChange.bind(this, 'mobile')}
                  keyboardType="number-pad"
                  label="Mobile Number"
                  maxLength={10}
                  prefix={country.country_code}
                />
                <Input
                  error={errors.password}
                  value={password}
                  accept="numbers"
                  onChangeText={this.handleChange.bind(this, 'password')}
                  secureTextEntry={true}
                  label="PIN"
                  keyboardType="number-pad"
                  containerStyles={style.inputContainerStyles}
                  maxLength={6}
                />
                <View style={[style.newUser]}>
                  <View style={[GeneralStyle.flexRow]}>
                    <Text>New user? </Text>
                    <TouchableOpacity
                      onPress={this.navigate.bind(this, 'Register')}>
                      <Text style={{color: theme.theme_colour}}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={this.navigate.bind(this, 'ForgotPassword')}>
                    <Text style={GeneralStyle.textRight}>Forgot PIN?</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    GeneralStyle.alignCenter,
                    GeneralStyle.mediumMarginTop,
                  ]}>
                  <Button onPress={this.login}>SIGN IN</Button>
                </View>
                {/* <Text style={style.or}>-OR-</Text>
                <View>
                  <SocialButton
                    source={require('../../assets/icon/facebook.png')}>
                    Sign in with Facebook
                  </SocialButton>
                  <SocialButton
                    source={require('../../assets/icon/google.png')}>
                    Sign in with Google
                  </SocialButton>
                </View> */}
              </View>
            </View>
          </View>
        </ScrollView>
        <ErrorBox
          message={errorMessage}
          visible={!!errorMessage}
          onClose={() => this.setState({errorMessage: ''})}
        />
        {isLoading && <Loader />}
      </View>
    );
  }
}

const mapStateToProps = store => ({
  appTheme: store.theme.appTheme,
  country: store.theme.country || {},
});

const mapDispatchToProps = {
  setUser: authAction.setUser,
  setUserRestaurant: authAction.setUserRestaurant,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
