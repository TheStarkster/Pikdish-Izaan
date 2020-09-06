import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import api from '../../config/api';
import helpers from '../../config/helpers';
import Header from '../../components/Header';
import ErrorBox from '../../components/ErrorBox';
import Loader from '../../components/Loader';
import ModalInput from '../../components/ModalInput';
import Button from '../../components/Button';
import Input from '../../components/Input';
import GeneralStyle from '../GeneralStyle';
import style from './style';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      isReferralModal: false,
      mobile: '',
      email: '',
      name: '',
      password: '',
      password2: '',
      referralCode: '',
      errors: {},
      theme: null,
    };

    this.handleReferralModalChange = this.handleReferralModalChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  navigate(route, params = {}) {
    if (route === 'PrivacyPolicy') {
      return this.props.navigation.navigate('TermsCondition', {
        privacyPolicy: true,
      });
    }

    if (route) this.props.navigation.navigate(route, params);
  }

  handleReferralModalChange(isReferralModal, referralCode) {
    this.setState({isReferralModal, referralCode});
  }

  handleChange(type, e) {
    if (type === 'mobile' || type === 'password' || type === 'password2') {
      if (!isNaN(e)) {
        this.setState({[type]: e});
      }
    } else {
      this.setState({[type]: e});
    }
  }

  checkOnevalidation(type) {
    const errors = {};
    const field = this.state[type];

    if (type === 'mobile' && (!field || field.length < 10)) {
      errors[type] = 'Mobile Number should be 10 digits';
      return this.setState({errors});
    }

    if (type === 'email' && !helpers.validateEmail(field)) {
      errors[type] = 'Please provide a valid email';
      return this.setState({errors});
    }

    if (type === 'password' && (!field || field.length < 6)) {
      errors[type] = 'Password should be 6 digits';
      return this.setState({errors});
    }

    if (type === 'password2' && (!type || field.length < 6)) {
      errors[type] = 'Password should be 6 digits';
      return this.setState({errors});
    } else if (
      type === 'password2' &&
      (!field || this.state.password !== field)
    ) {
      errors[type] = "Password and confirm password doesn't match";
      return this.setState({errors});
    }
  }

  async handleSubmit() {
    const validation = this.validate();

    try {
      if (validation) return;

      this.setState({isLoading: true});

      const body = {
        name: this.state.name,
        mobile_no: this.state.mobile,
        email: this.state.email,
        password: this.state.password,
        confirm_password: this.state.password2,
        referral_code: this.state.referralCode,
        restaurant_id: this.props.theme.restaurant_id,
      };

      await api.register(body);

      this.navigate('Verification', {mobile: body.mobile_no});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  }

  validate() {
    const {email, mobile, password, password2} = this.state;

    const errors = {};

    if (!helpers.validateEmail(email)) {
      errors.email = 'Please provide a valid email';
    }

    if (mobile.length < 10) {
      errors.mobile = 'Mobile Number should be 10 digits';
    }

    if (!password || password.length < 6) {
      errors.password = 'Password should be 6 digits';
    }

    if (!password2 || password2.length < 6) {
      errors.password2 = 'Password should be 6 digits';
    } else if (!password2 || password !== password2) {
      errors.password2 = "Password and confirm password doesn't match";
    }

    const keys = Object.keys(errors);

    this.setState({errors});

    return keys.length;
  }

  render() {
    const {
      isReferralModal,
      mobile,
      email,
      password,
      password2,
      errors,
      errorMessage,
      isLoading,
    } = this.state;

    const {theme, country} = this.props;

    return (
      <View style={GeneralStyle.flex1}>
        <Header>Sign Up</Header>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={[GeneralStyle.flex1]}>
          <View style={[GeneralStyle.container, GeneralStyle.noMarginTop]}>
            <View>
              <Input
                onChangeText={this.handleChange.bind(this, 'name')}
                maxLength={50}
                label="Name"
              />
              <Input
                value={mobile}
                error={errors.mobile}
                accept="numbers"
                containerStyle={GeneralStyle.flex1}
                onChangeText={this.handleChange.bind(this, 'mobile')}
                onBlur={this.checkOnevalidation.bind(this, 'mobile')}
                checkOnevalidation
                keyboardType="number-pad"
                label="Mobile Number"
                maxLength={10}
                prefix={country.country_code}
              />
              <Input
                label="Email"
                error={errors.email}
                value={email}
                onChangeText={this.handleChange.bind(this, 'email')}
                onBlur={this.checkOnevalidation.bind(this, 'email')}
                keyboardType="email-address"
                containerStyles={GeneralStyle.mediumMarginTop}
              />
              <Input
                error={errors.password}
                secureTextEntry={true}
                onChangeText={this.handleChange.bind(this, 'password')}
                onBlur={this.checkOnevalidation.bind(this, 'password')}
                value={password}
                accept="numbers"
                label="PIN"
                maxLength={6}
                keyboardType="number-pad"
                containerStyles={GeneralStyle.mediumMarginTop}
              />
              <Input
                error={errors.password2}
                secureTextEntry={true}
                value={password2}
                accept="numbers"
                onChangeText={this.handleChange.bind(this, 'password2')}
                onBlur={this.checkOnevalidation.bind(this, 'password2')}
                label="Confirm PIN"
                maxLength={6}
                keyboardType="number-pad"
                containerStyles={GeneralStyle.mediumMarginTop}
              />
              <View
                style={[
                  GeneralStyle.mediumMarginTop,
                  GeneralStyle.flexRow,
                  GeneralStyle.justifyBetween,
                  GeneralStyle.flexWrap,
                ]}>
                <View>
                  <TouchableOpacity onPress={this.navigate.bind(this, 'Login')}>
                    <Text
                      style={[
                        GeneralStyle.fontRed,
                        style.smallFonts,
                        {color: theme.theme_colour},
                      ]}>
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[GeneralStyle.flexRow]}>
                  <Text style={style.smallFonts}>Have a Referral Code? </Text>
                  <TouchableOpacity
                    onPress={this.handleReferralModalChange.bind(this, true)}>
                    <Text
                      style={[
                        GeneralStyle.fontRed,
                        style.smallFonts,
                        {color: theme.theme_colour},
                      ]}>
                      Apply Code
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={[
                  GeneralStyle.alignCenter,
                  GeneralStyle.mediumMarginTop,
                ]}>
                <Button onPress={this.handleSubmit}>SIGN UP</Button>
              </View>

              <View style={GeneralStyle.mediumMarginTop}>
                <Text style={[GeneralStyle.textCenter, GeneralStyle.fontGrey]}>
                  By Continuing, you agree to our
                </Text>
                <Text style={[GeneralStyle.textCenter]}>
                  <Text onPress={this.navigate.bind(this, 'TermsCondition')}>
                    Terms & Condition
                  </Text>
                  <Text style={GeneralStyle.fontGrey}> and</Text>{' '}
                  <Text onPress={this.navigate.bind(this, 'PrivacyPolicy')}>
                    Privacy Policy
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <ModalInput
          maxLength={7}
          code={this.state.referralCode}
          onClose={this.handleReferralModalChange}
          visible={isReferralModal}
        />

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
  theme: store.theme.appTheme,
  country: store.theme.country,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
