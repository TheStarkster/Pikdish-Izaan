import React, {Component} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import StarRating from 'react-native-star-rating';
import {connect} from 'react-redux';

import helpers from '../../config/helpers';
import api from '../../config/api';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import ScreenHeader from './components/Header';
import Comment from './Comment';
import constants from '../../config/constants';
import RatingBar from '../../components/RatingBar';
import Slider from './Slider';
import Header from '../../components/Header';
import GeneralStyle from '../GeneralStyle';
import style from './style';
import colors from '../../config/colors';
import Feature from './Feature';

class RestaurantDetail extends Component {
  state = {
    starCount: 4,
    isLoading: false,
    images: [],
    errorMessage: '',
    feedbacks: [],
    commonFeatures: [[], []],
    feedbackObject: {},
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      this.setState({isLoading: true});

      const promises = [
        this.fetchImages(),
        this.getFeedback(),
        this.getCommonFeatures(),
      ];
      const responses = await Promise.all(promises);

      console.log('responses =>', responses);

      this.setState({
        images: responses[0],
        feedbacks: responses[1] || [],
        feedbackObject: helpers.processRatings(responses[1] || []),
        commonFeatures: responses[2],
      });
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  fetchImages = async () => {
    const {restaurant} = this.props;

    try {
      const payload = {
        restaurant_id: restaurant.id,
      };

      const response = await api.getRestroImages(payload);
      return response.image;
    } catch (e) {
      throw e;
    }
  };

  getFeedback = async () => {
    const {restaurant} = this.props;

    try {
      const payload = {
        restaurant_id: restaurant.id,
      };

      const response = await api.getRestroFeedback(payload);
      return response.image;
    } catch (e) {
      throw e;
    }
  };

  getCommonFeatures = async () => {
    try {
      const response = await api.getCommonFeatures();
      const features = helpers.splitArrayHalf(response.feature);

      return features;
    } catch (e) {
      throw e;
    }
  };

  onStarRatingPress(starCount) {
    this.setState({starCount}, () => {
      this.navigateToFeedback({rating: starCount});
    });
  }

  navigateToFeedback = params => {
    this.props.navigation.navigate('Feedback', params);
  };

  calcProgress = (total, obtain = 0) => {
    if (total === 0) return 0;
    if (obtain === 0) return 0;

    console.log('obtain / total =>', obtain / total);

    return obtain / total;
  };

  render() {
    const {
      images,
      isLoading,
      errorMessage,
      feedbacks,
      commonFeatures,
      feedbackObject,
    } = this.state;
    const {restaurant} = this.props;

    return (
      <View style={GeneralStyle.flex1}>
        <Header headerStyles={GeneralStyle.backgroundLightGrey} />
        <ScrollView
          style={[GeneralStyle.flex1, GeneralStyle.backgroundLightGrey]}>
          <View
            style={[
              GeneralStyle.container,
              style.container,
              GeneralStyle.noMarginTop,
              {paddingBottom: 0, marginBottom: 0},
            ]}>
            <ScreenHeader
              restaurant={restaurant}
            />
            {!!images.length && (
              <View>
                <Slider data={images} />
              </View>
            )}
            <View style={style.ratingContainer}>
              <View style={[style.rating]}>
                <Image
                  resizeMode="contain"
                  style={style.reviewIcon}
                  source={require('../../assets/icon/review.png')}
                />
                <Text style={style.reviewText}>Rating & Reviews</Text>
              </View>
              <View style={style.reviewContainer}>
                <View style={style.review}>
                  <View style={style.ratingRedBox}>
                    <Text style={style.ratingAverageText}>
                      {restaurant.rating}
                    </Text>
                  </View>
                  <Text style={style.ratingNumber}>
                    {feedbacks.length} Ratings
                  </Text>
                  <Text style={style.reviewNumber}>
                    {feedbacks.length} Reviews
                  </Text>
                </View>
                <View style={GeneralStyle.flex1}>
                  <RatingBar
                    total={feedbacks.length}
                    ratingPlaceholder={1}
                    progress={this.calcProgress(
                      feedbacks.length,
                      feedbackObject[1],
                    )}
                    rating={feedbackObject[1] || 0}
                  />
                  <RatingBar
                    total={feedbacks.length}
                    ratingPlaceholder={2}
                    progress={this.calcProgress(
                      feedbacks.length,
                      feedbackObject[2],
                    )}
                    rating={feedbackObject[2] || 0}
                  />
                  <RatingBar
                    total={feedbacks.length}
                    ratingPlaceholder={3}
                    progress={this.calcProgress(
                      feedbacks.length,
                      feedbackObject[3],
                    )}
                    rating={feedbackObject[3] || 0}
                  />
                  <RatingBar
                    total={feedbacks.length}
                    ratingPlaceholder={4}
                    progress={this.calcProgress(
                      feedbacks.length,
                      feedbackObject[4],
                    )}
                    rating={feedbackObject[4] || 0}
                  />
                  <RatingBar
                    total={feedbacks.length}
                    ratingPlaceholder={5}
                    progress={this.calcProgress(
                      feedbacks.length,
                      feedbackObject[5],
                    )}
                    rating={feedbackObject[5] || 0}
                  />
                </View>
              </View>
              <View style={style.reviewSectionContainer}>
                <View style={GeneralStyle.flex1}>
                  <Text style={style.reviewSectionText}>Be the first one</Text>
                  <Text style={style.reviewSectionText}>to review</Text>
                </View>
                <View style={[GeneralStyle.flex1, {marginRight: 20}]}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    fullStarColor={colors.GOLDEN}
                    starSize={constants.WINDOW_WIDTH * 0.07}
                    rating={this.state.starCount}
                    selectedStar={rating => this.onStarRatingPress(rating)}
                  />
                </View>
              </View>
              <View>
                {feedbacks.map(item => (
                  <Comment data={item} />
                ))}
              </View>
              <View style={style.featureContainer}>
                <Image
                  style={style.moreIcon}
                  source={require('../../assets/icon/more.png')}
                />
                <Text style={style.featuresHeading}>FACILITIES & FEATURES</Text>
              </View>
              <View style={style.featureListContainer}>
                {!!commonFeatures[0].length && (
                  <View style={style.featureListLeft}>
                    {commonFeatures[0].map((item, i) => (
                      <Feature
                        data={item}
                        icon={require('../../assets/icon/smoking-area.png')}
                        feature="Smoking Area"
                        iconStyle={{marginLeft: 0}}
                        containerStyle={i === 0 ? GeneralStyle.noMarginTop : {}}
                      />
                    ))}
                  </View>
                )}
                {!!commonFeatures[1].length && (
                  <View style={style.featureListRight}>
                    {commonFeatures[1].map((item, i) => (
                      <Feature
                        data={item}
                        icon={require('../../assets/icon/air-conditioner.png')}
                        feature="Air Conditional"
                        containerStyle={i === 0 ? GeneralStyle.noMarginTop : {}}
                      />
                    ))}
                  </View>
                )}
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
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantDetail);
