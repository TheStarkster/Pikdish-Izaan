import React, {Component} from 'react';
import {View, Text, ScrollView, Image, TextInput} from 'react-native';
import {connect} from 'react-redux';

import helpers from '../../config/helpers';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import Rating from './Rating';
import Header from '../../components/Header';
import Button from '../../components/Button';
import GeneralStyle from '../GeneralStyle';
import style from './style';
import api from '../../config/api';

class Feedback extends Component {
  constructor() {
    super();

    this.handleTextChange = this.handleTextChange.bind(this);
  }

  state = {
    review: '',
    rating: 0,
    errorMessage: '',
    isLoading: false,
  };

  componentDidMount() {
    const {navigation = {}} = this.props;
    const {state = {}} = navigation;
    const {params = {}} = state;

    this.setState({rating: params.rating});
  }

  navigate(route) {
    this.props.navigation.navigate(route);
  }

  sendFeedback = async () => {
    const {review, rating} = this.state;
    const {user, restaurant} = this.props;

    try {
      this.setState({isLoading: true});

      const payload = {
        user_id: user.id,
        restaurant_id: restaurant.restaurant_id,
        feedback_text: review,
        rating: rating,
      };
      await api.saveFeedback(payload);

      this.props.navigation.dispatch(helpers.getStackReseter('Main', {}));
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  handleTextChange(e) {
    this.setState({review: e});
  }

  handleRatingChange = rating => {
    this.setState({rating});
  };

  render() {
    const {restaurant} = this.props;
    const {review, rating, isLoading, errorMessage} = this.state;

    return (
      <View style={GeneralStyle.flex1}>
        <Header>Feedback</Header>
        <ScrollView
          style={[GeneralStyle.flex1, GeneralStyle.backgroundLightGrey]}>
          <View style={GeneralStyle.container}>
            <View style={style.container}>
              <View style={style.imageContainer}>
                <Image
                  style={style.dishIcon}
                  source={require('../../assets/icon/serving-dish.png')}
                />
              </View>
              <View style={GeneralStyle.mediumMarginTop}>
                <Text style={style.restaurantName}>
                  {restaurant.restaurant_name}
                </Text>
                {/* <Text style={style.address}>Ratanada Jodhpur</Text> */}
              </View>
              <Rating
                onRatingChange={this.handleRatingChange}
                rating={rating}
              />
              <View style={GeneralStyle.smallMarginTop}>
                <Text style={style.reviewText}>START WRITING YOUR REVIEW</Text>
                <TextInput
                  style={style.textInput}
                  onChangeText={this.handleTextChange}
                  value={review}
                  placeholder="Enter Review"
                  multiline={true}
                />
              </View>
              <View style={style.buttonContainer}>
                <Button
                  onPress={this.sendFeedback}
                  buttonStyles={GeneralStyle.w100}>
                  Send
                </Button>
              </View>
            </View>
          </View>
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
  restaurant: store.restaurant.restaurant,
  user: store.auth.user,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feedback);
