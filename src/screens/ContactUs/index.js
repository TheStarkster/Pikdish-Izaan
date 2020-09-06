import React, {Component} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import styles from './style.js';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Dash from 'react-native-dash';
import {connect} from 'react-redux';

import helpers from '../../config/helpers';
import api from '../../config/api';
import Header from '../../components/Header';
import ErrorBox from '../../components/ErrorBox';
import Loader from '../../components/Loader';
import GeneralStyles from '../GeneralStyle';
import colors from '../../config/colors';
import FoodCourtSlider from '../../components/FoodCourtSlider';
import constants from '../../config/constants.js';

const data = [
  'https://sifu.unileversolutions.com/image/en-AU/recipe-topvisual/2/1260-709/beef-burger-with-deep-fried-bacon-and-thousand-island-dressing-50247463.jpg',
  'https://sifu.unileversolutions.com/image/en-AU/recipe-topvisual/2/1260-709/beef-burger-with-deep-fried-bacon-and-thousand-island-dressing-50247463.jpg',
  'https://sifu.unileversolutions.com/image/en-AU/recipe-topvisual/2/1260-709/beef-burger-with-deep-fried-bacon-and-thousand-island-dressing-50247463.jpg',
  'https://sifu.unileversolutions.com/image/en-AU/recipe-topvisual/2/1260-709/beef-burger-with-deep-fried-bacon-and-thousand-island-dressing-50247463.jpg',
];

class ContactUs extends Component {
  state = {
    isLoading: false,
    errorMessage: '',
    data: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const {theme} = this.props;

    try {
      this.setState({isLoading: true});

      const payload = {
        restaurant_id: theme.restaurant_id,
      };

      const response = await api.getRestaurantContactUs(payload);
      
      this.setState({data: response.data[0]});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  openDialer = num => {
    helpers.openDialer(num);
  };

  render() {
    const {theme} = this.props;
    const {data, isLoading, errorMessage} = this.state;

    return (
      <View>
        <Header />
        {data && (
          <View style={styles.contactUsContainer}>
            <ScrollView>
              <View style={GeneralStyles.alignCenter}>
                <Image
                  source={{
                    uri: constants.RESTAURANT_LOGO_PATH + theme.app_logo,
                  }}
                  resizeMode="contain"
                  style={styles.logo}
                />
              </View>
              <View style={GeneralStyles.secondContainer}>
                <Dash
                  dashColor={colors.GREY}
                  style={{width: '100%', height: 1}}
                />
                {/* <View style={styles.dottedBorder}></View> */}
                <Text style={[styles.heading, {color: theme.theme_colour}]}>
                  Address:
                </Text>
                <Text style={[styles.text]}>{data.address}</Text>
                <View style={styles.borderLine}></View>
                <Text style={[styles.heading, {color: theme.theme_colour}]}>
                  Contact Details:
                </Text>
                <Text
                  onPress={() => this.openDialer(data.contact_no)}
                  style={styles.text}>
                  {data.contact_no}
                </Text>
                <View style={styles.borderLine}></View>
                <Text style={[styles.heading, {color: theme.theme_colour}]}>
                  Follow us on:
                </Text>
                <View style={[GeneralStyles.flexRow, GeneralStyles.flexWrap]}>
                  <View style={styles.socialLinkContainer}>
                    <EntypoIcon
                      name="facebook-with-circle"
                      size={25}
                      color={colors.fbBlue}
                    />
                    <Text
                      onPress={() => helpers.openFacebook(data.facebook_link)}
                      style={[
                        styles.socialLink,
                        GeneralStyles.smallMarginRight,
                      ]}>
                      @
                      {helpers.extractUsernameFromSocialLink(
                        data.facebook_link,
                      )}
                    </Text>
                  </View>
                  <View style={styles.socialLinkContainer}>
                    <Image
                      source={require('../../assets/icon/insta.png')}
                      style={styles.instagramIcon}
                    />
                    <Text
                      onPress={() => helpers.openInstagram(data.instagram_link)}
                      style={styles.socialLink}>
                      @
                      {helpers.extractUsernameFromSocialLink(
                        data.instagram_link,
                      )}
                    </Text>
                  </View>
                </View>
                <View style={styles.borderLine}></View>
                <Text style={[styles.heading, {color: theme.theme_colour}]}>
                  Website:
                </Text>
                <Text
                  onPress={() => helpers.openWebsite(data.website_url)}
                  style={styles.text}>
                  {data.website_url}
                </Text>
                <View style={styles.borderLine}></View>
                <Text
                  style={[
                    styles.pikdishActivitiesText,
                    {color: theme.theme_colour},
                  ]}>
                  PIKIDISH Activities
                </Text>
                {data.gallery.length ? (
                  <View style={styles.sliderContainer}>
                    <FoodCourtSlider data={data.gallery} />
                  </View>
                ) : (
                  <Text style={styles.pikdishActivitiesText}>
                    No Activity Yet!
                  </Text>
                )}
              </View>
            </ScrollView>
          </View>
        )}
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
  theme: store.theme.appTheme,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
