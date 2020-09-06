import React, {Component} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {connect} from 'react-redux';

import api from '../../config/api';
import ErrorBox from '../../components/ErrorBox';
import Loader from '../../components/Loader';
import Header from '../../components/Header';
import Thumbnail from '../../components/Thumbnail';
import Input from '../../components/Input';
import Button from '../../components/Button';
import GeneralStyle from '../GeneralStyle';
import style from './style';

class ChangePin extends Component {
  state = {
    newPin: '',
    newPin2: '',
    currentPin: '',
    user: null,
    errorMessage: '',
    isLoading: false,
    errors: {},
  };

  // componentDidMount() {
  //   this.getUserData();
  // }

  // getUserData = async () => {
  //   const {user} = this.props;

  //   try {
  //     const payload = {user_id: user.id};

  //     const response = await api.getUserProfile(payload);

  //     this.setState({user: response.profile});
  //   } catch (e) {
  //     this.setState({errorMessage: e.message});
  //   }
  // };

  changePassword = async () => {
    const {user} = this.props;

    try {
      if (!this.validate()) {
        return;
      }

      if (!this.validate2()) {
        return;
      }

      this.setState({isLoading: true});

      const payload = {
        user_id: user.id,
        current_pin: this.state.currentPin,
        new_pin: this.state.newPin,
        confirm_pin: this.state.newPin2,
      };

      const response = await api.changePIN(payload);

      this.setState({
        user: response.user,
        errorMessage: 'PIN updated successfully',
        errorHeading: 'Success!',
      });
    } catch (e) {
      this.setState({
        errorMessage: e.message,
        errorHeading: 'What went wrong!',
      });
    }

    this.setState({isLoading: false});
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

  validate = () => {
    const errors = {};
    const {newPin, newPin2, currentPin} = this.state;

    if (!newPin) {
      errors.newPin = 'New PIN is required';
    }

    if (!newPin2) {
      errors.newPin2 = 'New PIN is required';
    }

    if (!currentPin) {
      errors.currentPin = 'Current PIN is required';
    }

    this.setState({errors});

    return !Object.keys(errors).length;
  };

  validate2 = () => {
    const errors = {};
    const {newPin, newPin2, currentPin} = this.state;

    if (newPin === currentPin) {
      errors.currentPin = 'Current PIN and new PIN cannot be same';
      errors.newPin = 'Current PIN and new PIN cannot be same';
    }

    if (newPin !== newPin2) {
      errors.newPin2 = "New PIN and confirm new PIN doesn't match";
    }

    this.setState({errors});

    return !Object.keys(errors).length;
  };

  render() {
    const {
      currentPin,
      newPin,
      newPin2,
      isLoading,
      errorMessage,
      errorHeading,
      errors,
    } = this.state;

    return (
      <View style={GeneralStyle.flex1}>
        <Header />
        <ScrollView style={[GeneralStyle.flex1]}>
          <View style={[GeneralStyle.container, GeneralStyle.noMarginTop]}>
            <Text style={[GeneralStyle.mediumHeading, GeneralStyle.textCenter]}>
              Change PIN?
            </Text>
            <View style={GeneralStyle.alignCenter}>
              <Thumbnail
                style={style.image}
                source={require('../../assets/images/profile.png')}
              />
            </View>
            <View style={GeneralStyle.mediumMarginTop}>
              <Input
                value={currentPin}
                error={errors.currentPin}
                accept="numbers"
                secureTextEntry={true}
                containerStyle={GeneralStyle.flex1}
                onChangeText={this.handleChange.bind(this, 'currentPin')}
                keyboardType="number-pad"
                label="Current PIN"
                maxLength={6}
              />
              <Input
                value={newPin}
                error={errors.newPin}
                accept="numbers"
                secureTextEntry={true}
                containerStyle={GeneralStyle.flex1}
                onChangeText={this.handleChange.bind(this, 'newPin')}
                keyboardType="number-pad"
                label="New PIN"
                maxLength={6}
              />
              <Input
                value={newPin2}
                error={errors.newPin2}
                accept="numbers"
                secureTextEntry={true}
                containerStyle={GeneralStyle.flex1}
                onChangeText={this.handleChange.bind(this, 'newPin2')}
                keyboardType="number-pad"
                label="Re-Type New PIN"
                maxLength={6}
              />
            </View>
            <View
              style={[GeneralStyle.mediumMarginTop, GeneralStyle.alignCenter]}>
              <Button onPress={this.changePassword}>Ok</Button>
            </View>
          </View>
        </ScrollView>
        {isLoading && <Loader />}
        <ErrorBox
          heading={errorHeading}
          onClose={() => this.setState({errorMessage: ''})}
          message={errorMessage}
        />
      </View>
    );
  }
}

const mapStateToProps = store => ({user: store.auth.user});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePin);
