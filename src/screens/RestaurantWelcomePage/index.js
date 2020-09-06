import React, {Component} from 'react';
import styles from './style';
import {Text, View, ImageBackground, Image} from 'react-native';
import {connect} from 'react-redux';

import constants from '../../config/constants';

class RestaurantWelcomePage extends Component {
  state = {
    disappears: 10,
  };

  componentDidMount() {
    const params = {...this.props.navigation.state.params, fromWelcome: true};

    this.int = setInterval(() => {
      if (this.state.disappears === 0) {
        clearInterval(this.int);
        return this.props.navigation.navigate('RestaurantItems', params);
      }

      this.setState({disappears: this.state.disappears - 1});
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.int);
  }

  getRestaurantImage = () => {
    const {restaurant} = this.props;

    return constants.RESTAURANT_LOGO_PATH + restaurant.logo_pic;
  };

  render() {
    const {disappears} = this.state;
    const {restaurant} = this.props;

    return (
      <ImageBackground
        source={{
          uri: constants.RESTAURANT_LOGO_PATH + restaurant.welcome_page_image,
        }}
        style={styles.backgroundImage}>
        <View style={styles.welcomeContainer}>
          <View style={styles.welcomeContainerImageBox}>
            <Image
              resizeMode="contain"
              source={{
                uri: this.getRestaurantImage(),
              }}
              style={styles.welcomeContainerImage}
            />
          </View>
          <Text style={styles.welcomeText}>Welcome To</Text>
          <Text style={styles.welcomeText}>{restaurant.restaurant_name}</Text>
          <Text style={styles.tableNo}>
            You are on table no {restaurant.table_no}
          </Text>
          <View style={styles.borderLine}></View>
          <View style={styles.textDisappearsBox}>
            <Text style={styles.textDisappears}>
              Dissappears in {disappears} seconds
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = store => ({
  restaurant: store.selectedRestaurant.restaurant,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantWelcomePage);
