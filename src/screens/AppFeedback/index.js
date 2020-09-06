import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput, Image} from 'react-native';
import Dash from 'react-native-dash';
import {connect} from 'react-redux';

import api from '../../config/api';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import Button from '../../components/Button';
import GeneralStyle from '../GeneralStyle';
import style from './style';
import colors from '../../config/colors';
import constants from '../../config/constants';

class AppFeedback extends Component {
  state = {
    errorMessage: '',
    errorHeading: undefined,
    isLoading: false,
    feedback: '',
  };

  saveFeedback = async () => {
    const {user, theme} = this.props;
    const {feedback} = this.state;

    try {
      if (!feedback) throw new Error('Please write your feedback!');

      this.setState({isLoading: true});

      const payload = {
        user_id: user.id,
        restaurant_id: theme.restaurant_id,
        feedback_text: feedback,
        rating: '0',
      };

      const response = await api.saveFeedback(payload);

      this.setState({errorHeading: 'Success', errorMessage: response.message});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  handleChange = e => {
    this.setState({feedback: e});
  };

  render() {
    const {errorMessage, isLoading, feedback, errorHeading} = this.state;
    const {theme} = this.props;

    return (
      <View style={GeneralStyle.flex1}>
        <Header></Header>
        <ScrollView
          style={[GeneralStyle.flex1, GeneralStyle.backgroundLightGrey]}>
          <View style={[GeneralStyle.container, GeneralStyle.noMarginTop]}>
            <View style={[GeneralStyle.flexRow, GeneralStyle.justifyCenter]}>
              <Image
                resizeMode="contain"
                style={style.logo}
                source={{uri: constants.RESTAURANT_LOGO_PATH + theme.app_logo}}
              />
            </View>
            <View style={GeneralStyle.mediumMarginTop}>
              <Dash dashColor={colors.GREY} />
            </View>
            <View style={style.content}>
              <Text style={style.feedbackHeading}>Feedback</Text>
              <Text style={style.feedbackMessage}>
                Provide Your feedback to PIKDISH Team
              </Text>
              <View style={style.feedbackInputContainer}>
                <TextInput
                  value={feedback}
                  onChangeText={this.handleChange}
                  multiline={true}
                  placeholder="Enter Feedback"
                />
              </View>
              <View style={style.buttonContainer}>
                <Button onPress={this.saveFeedback} buttonStyles={style.button}>
                  Send
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
        {isLoading && <Loader />}
        <ErrorBox
          message={errorMessage}
          heading={errorHeading}
          onClose={() =>
            this.setState({errorMessage: '', errorHeading: undefined})
          }
        />
      </View>
    );
  }
}

const mapStateToProps = store => ({
  theme: store.theme.appTheme,
  user: store.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppFeedback);
