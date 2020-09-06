import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import authAction from '../../redux/auth/action';

import helpers from '../../config/helpers';
import ErrorBox from '../../components/ErrorBox';
import Loader from '../../components/Loader';
import api from '../../config/api';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import GeneralStyle from '../GeneralStyle';
import style from './style';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
};

class EditProfile extends Component {
  constructor() {
    super();

    this.handleTextChange = this.handleTextChange.bind(this);
    this.onImagePress = this.onImagePress.bind(this);
  }

  state = {
    dob: '',
    dobExtra: '',
    avatar: undefined,
    errorMessage: '',
    isLoading: false,
    profile: null,
    errors: {},
    name: '',
    mobileNo: '',
    email: '',
    anniversary: '',
    profilePic: '',
  };

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    const { user } = this.props;

    try {
      this.setState({ isLoading: true });

      const payload = { user_id: user.id };

      const response = await api.getUserProfile(payload, user.AuthToken);

      this.setState({
        avatar: user.profilePic ? user.profilePic : user.defaultPic,
        mobileNo: response.profile.mobile_no,
        name: response.profile.name,
        email: response.profile.email,
        dob: response.profile.date_of_birth,
        anniversary: response.profile.date_of_anniversary,
      });
    } catch (e) {
      setTimeout(() => {
        this.setState({ errorMessage: e.message })
      }, 1000)
      // this.setState({ errorMessage: e.message, isLoading: false });
    }

    this.setState({ isLoading: false });
  };

  validate = () => {
    const errors = {};

    if (!this.state.name || !helpers.checkAlphabetsAndSpace(this.state.name)) {
      errors.name = 'Name should only contain alphabets and spaces';
    }

    if (!helpers.validateEmail(this.state.email)) {
      errors.email = 'Please provide a valid email';
    }

    this.setState({ errors });
    return Object.keys(errors).length;
  };

  handleTextChange(key, value) {
    this.setState({ [key]: value });
  }

  saveData = async () => {
    const { user, setUser } = this.props;

    try {
      if (this.validate()) return;

      this.setState({ isLoading: true });

      const payload = {
        user_id: user.id,
        name: this.state.name,
        email: this.state.email,
        user_pic: this.state.avatar,
        date_of_birth: this.state.dob,
        date_of_anniversary: this.state.anniversary,
      };

      if (!payload.user_pic || payload.user_pic.startsWith('http')) {
        payload.user_pic = '';
      }

      await api.setUserProfile(payload, user.AuthToken);

      setUser({ ...user, profilePic: this.state.avatar });

      this.setState({
        errorMessage: 'Profile updated successfully',
        errorHeading: 'Success',
      });
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }

    this.setState({ isLoading: false });
  };

  onImagePress() {
    const options = {};

    console.log("onImagePress")

    ImagePicker.launchImageLibrary(options, response => {
      console.log("response =>", response)
      if (response.didCancel) return;

      else if (response.error) return alert(response.error);

      const base64 = `data:${response.type};base64,${response.data}`;

      const source = base64;

      this.setState({
        avatar: source,
      });
    });
  }

  render() {
    const {
      dob,
      avatar = this.props.user.defaultPic,
      isLoading,
      errorMessage,
      mobileNo,
      name,
      email,
      anniversary,
      errors,
      errorHeading,
    } = this.state;

    return (
      <View style={GeneralStyle.flex1}>
        <Header>Edit Profile</Header>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={[GeneralStyle.flex1, GeneralStyle.backgroundLightGrey]}>
          <View style={[GeneralStyle.container, style.container]}>
            <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
              <View style={[GeneralStyle.flex1, GeneralStyle.alignCenter]}>
                <TouchableOpacity onPress={this.onImagePress}>
                  <Avatar source={{ uri: avatar }} style={style.avatar} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={style.form}>
              <Input
                error={errors.name}
                onChangeText={value => this.handleTextChange('name', value)}
                containerStyles={style.input}
                value={name}
                label="Name"
              />
              <Input
                onChangeText={value => this.handleTextChange('mobileNo', value)}
                value={mobileNo}
                accept="numbers"
                containerStyles={style.input}
                label="Mobile No"
                editable={false}
                prefix="+91"
                keyboardType="number-pad"
              />
              <Input
                error={errors.email}
                onChangeText={value => this.handleTextChange('email', value)}
                containerStyles={style.input}
                value={email}
                label="Email"
                keyboardType="email-address"
              />
              <Input
                onChangeText={value => this.handleTextChange('dob', value)}
                value={dob}
                onFocus={() => {
                  this.setState({ dob: '' }, () => {
                    this.dobPicker.onPressDate();
                  });
                }}
                containerStyles={style.input}
                label="Date of birth"
              />
              <Input
                value={anniversary}
                onChangeText={value =>
                  this.handleTextChange('anniversary', value)
                }
                onFocus={() => {
                  this.setState({ anniversary: '' }, () => {
                    this.anniversaryPicker.onPressDate();
                  });
                }}
                containerStyles={style.input}
                label="Anniversary"
              />
              <View style={style.saveButtonContainer}>
                <Button onPress={this.saveData} buttonStyles={style.saveButton}>
                  Save
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
        <DatePicker
          style={style.datePicker}
          date={this.state.dob}
          ref={el => (this.dobPicker = el)}
          mode="date"
          placeholder="Select Date of birth"
          format="DD-MM-YYYY"
          maxDate={new Date()}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: style.datePicker,
            dateInput: style.datePicker,
          }}
          value={dob}
          onCloseModal={() => {
            const { dobExtra } = this.state;

            if (dobExtra) {
              this.setState({ dob: dobExtra });
            }
          }}
          onDateChange={date => {
            this.setState({ dob: date, dobExtra: date });
          }}
        />
        <DatePicker
          style={style.datePicker}
          date={this.state.anniversary}
          ref={el => (this.anniversaryPicker = el)}
          mode="date"
          placeholder="Select Anniversary"
          format="DD-MM-YYYY"
          maxDate={new Date()}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: style.datePicker,
            dateInput: style.datePicker,
          }}
          value={dob}
          onCloseModal={() => {
            const { anniversaryExtra } = this.state;

            if (anniversaryExtra) {
              this.setState({ anniversary: anniversaryExtra });
            }
          }}
          onDateChange={date => {
            this.setState({ anniversary: date, anniversaryExtra: date });
          }}
        />
        {isLoading && <Loader />}
        {!!errorMessage &&
          <ErrorBox
            message={errorMessage}
            heading={errorHeading}
            onClose={() => this.setState({ errorMessage: '' })}
          />
        }
      </View>
    );
  }
}

const mapStateToProps = store => ({
  user: store.auth.user,
  theme: store.theme.appTheme,
});

const mapDispatchToProps = {
  setUser: authAction.setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
