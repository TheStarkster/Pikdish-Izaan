import React, {Component} from 'react';
import {ScrollView, View, Text} from 'react-native';

import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import api from '../../config/api';
import Header from '../../components/Header';
import Thumbnail from '../../components/Thumbnail';
import Input from '../../components/Input';
import Button from '../../components/Button';
import GeneralStyle from '../GeneralStyle';
import style from './style';
import {connect} from 'react-redux';

class ForgotPassword extends Component {
  state = {
    mobile: '',
    errors: {},
    isLoading: false,
    errorMessage: '',
  };

  handleSubmit = async () => {
    try {
      if (this.validate()) return;

      this.setState({isLoading: true});

      const body = {
        mobile_no: this.state.mobile,
        restaurant_id: this.props.theme.restaurant_id,
      };

      await api.forgotPassword(body);

      this.props.navigation.navigate('Verification', {
        mobile: this.state.mobile,
      });
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  validate = () => {
    const errors = {};

    if (!this.state.mobile || this.state.mobile.length < 10) {
      errors.mobile = 'Mobile Number should be 10 digits';
    }

    this.setState({errors});

    return Object.keys(errors).length;
  };

  handleChange(type, e) {
    if (type === 'mobile') {
      if (!isNaN(e)) {
        this.setState({mobile: e});
      }
    } else {
      this.setState({[type]: e});
    }
  }

  render() {
    const {mobile, isLoading, errorMessage, errors} = this.state;
    const {country} = this.props;

    return (
      <View style={GeneralStyle.flex1}>
        <Header />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={[GeneralStyle.flex1]}>
          <View style={[GeneralStyle.container, GeneralStyle.noMarginTop]}>
            <Text style={[GeneralStyle.mediumHeading, GeneralStyle.textCenter]}>
              Forgot PIN?
            </Text>
            <View style={GeneralStyle.alignCenter}>
              <Thumbnail
                style={style.image}
                source={require('../../assets/images/profile.png')}
              />
            </View>
            <Text style={style.message}>
              Enter the Mobile Number associated with your account
            </Text>
            <View style={GeneralStyle.mediumMarginTop}>
              <Input
                error={errors.mobile}
                onBlur={this.validate}
                value={mobile}
                accept="numbers"
                containerStyle={GeneralStyle.flex1}
                onChangeText={this.handleChange.bind(this, 'mobile')}
                keyboardType="number-pad"
                label="Mobile Number"
                maxLength={10}
                prefix={country.country_code}
              />
            </View>
            <View
              style={[GeneralStyle.mediumMarginTop, GeneralStyle.alignCenter]}>
              <Button onPress={this.handleSubmit}>NEXT</Button>
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
  theme: store.theme.appTheme,
  country: store.theme.country,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
