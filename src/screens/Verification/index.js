import React, {Component} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import RNOtpVerify from 'react-native-otp-verify';

import helpers from '../../config/helpers';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import constants from '../../config/constants';
import Header from '../../components/Header';
import Button from '../../components/Button';
import CodeInput from '../../components/CodeInput';
import GeneralStyle from '../GeneralStyle';
import api from '../../config/api';

class Verification extends Component {
  constructor() {
    super();

    this.startTimer = this.startTimer.bind(this);
  }

  state = {
    timer: 0,
    otp: null,
  };

  async componentDidMount() {
    this.startTimer();
    // this.getHash();
    this.startListeningForOtp();
  }

  startListeningForOtp = () =>
    RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(this.otpHandler))
      .catch(p => console.log(p));

  otpHandler = message => {
    const code = message.slice(0, message.indexOf(' '));

    this.setState({otp: code});
    this.codeInput.setState({codeArr: code.split('')});
  };

  getHash = async () => {
    try {
      const hash = await RNOtpVerify.getHash();
      alert(hash[0]);
    } catch (e) {
      alert(e.message);
    }
  };

  startTimer() {
    this.setState({timer: 60}, () => {
      this.timer = setInterval(() => {
        this.setState({timer: this.state.timer - 1});
      }, 1000);
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    RNOtpVerify.removeListener();
  }

  verify = async () => {
    try {
      const {navigation} = this.props;
      const {state = {}} = navigation;
      const {params = {}} = state;

      const mobile = params.mobile || '';

      this.setState({isLoading: true});

      const body = {
        mobile_no: mobile,
        otp: this.state.otp,
      };

      await api.verifyOTP(body);
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  handleFulFill = e => {
    this.setState({otp: e});
  };

  render() {
    const {timer, errorMessage, isLoading} = this.state;
    const {navigation} = this.props;
    const {state = {}} = navigation;
    const {params = {}} = state;

    const mobile = params.mobile || '';

    return (
      <View style={GeneralStyle.flex1}>
        <Header />
        <ScrollView style={[GeneralStyle.flex1]}>
          <View style={[GeneralStyle.container, GeneralStyle.noMarginTop]}>
            <Text
              style={[
                GeneralStyle.mediumHeading,
                {fontSize: constants.FONT_MEDIUM * 1.4},
              ]}>
              Verification
            </Text>
            <Text style={GeneralStyle.fontGrey}>
              Enter 6 digit code sent to your mobile number
            </Text>
            <Text style={[GeneralStyle.fontGrey, GeneralStyle.smallMarginTop]}>
              {helpers.markString(mobile)}
            </Text>
            <View style={GeneralStyle.mediumMarginTop}>
              <CodeInput
                customRef={el => (this.codeInput = el)}
                onFulfill={this.handleFulFill}
              />
              {timer < 1 ? (
                <TouchableOpacity
                  onPress={this.startTimer}
                  style={GeneralStyle.smallMarginTop}>
                  <Text style={[GeneralStyle.textRight, GeneralStyle.fontRed]}>
                    Re-send
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={GeneralStyle.smallMarginTop}>
                  <Text style={[GeneralStyle.textRight, GeneralStyle.fontRed]}>
                    {timer} Seconds Remaining
                  </Text>
                </View>
              )}
            </View>
            <View
              style={[GeneralStyle.smallMarginTop, GeneralStyle.alignCenter]}>
              <Button onPress={this.verify}>Next</Button>
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
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Verification);
