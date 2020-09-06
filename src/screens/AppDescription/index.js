import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import {connect} from 'react-redux';

import api from '../../config/api';
import helpers from '../../config/helpers';
import themeAction from '../../redux/theme/action';
import authAction from '../../redux/auth/action';
import Button from '../../components/Button';
import AppDetailsSlider from '../../components/AppDetailsSlider';
import GeneralStyle from '../GeneralStyle';
import style from './style';

class AppDescription extends Component {
  state = {
    theme: null,
  };

  async componentDidMount() {
    let data = await AsyncStorage.getItem('theme');
    const country = await AsyncStorage.getItem('country');
    const address = await AsyncStorage.getItem('address');

    await AsyncStorage.removeItem('address');

    data = JSON.parse(data);

    this.props.setAppTheme(data);
    this.props.setCountryData(JSON.parse(country));

    this.fetchCuisine(data);

    if (address) {
      this.props.setLocation(address);
    }

    if (data && data.is_explore_page === '0') {
      this.props.navigation.navigate('Home');
    }

    this.setState({theme: data});

    this.checkUser();
  }

  navigateAndReset(route) {
    this.props.navigation.dispatch(helpers.getStackReseter(route));
  }

  async fetchCuisine(theme) {
    try {
      const payload = {restaurant_id: theme.restaurant_id};

      const response = await api.getCuisineList(payload);

      const data = response.options.map(item => ({
        label: item.cuisine_name,
        value: item.id,
      }));

      this.props.setCuisine(data || []);
    } catch (e) {
    }
  }

  checkUser = () => {
    const {user} = this.props;

    if (!user) return;

    if (
      user.user_type === '0' ||
      user.user_type === '1' ||
      user.user_type === '5'
    ) {
      this.navigateAndReset('Main');
    } else if (user.user_type === '2' || user.user_type === '4') {
      this.navigateAndReset('Dashboard');
    } else if (user.user_type === '3') {
      // this.navigateAndReset('BookTable');
      this.navigateAndReset('Main');
    }
  };

  navigate(route) {
    this.props.navigation.navigate(route);
  }

  render() {
    const {theme} = this.state;
    const bundleId = DeviceInfo.getBundleId();

    if (!theme) return null;

    return (
      <View style={GeneralStyle.flex1}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={[GeneralStyle.flex1, GeneralStyle.backgroundLightGrey]}>
          <View style={GeneralStyle.flex1}>
            <AppDetailsSlider />
            <TouchableOpacity
              onPress={this.navigate.bind(this, 'Main')}
              style={style.exploreContainer}>
              <Text style={style.explore}>Explore</Text>
            </TouchableOpacity>
            <View style={GeneralStyle.alignCenter}>
              <Button
                onPress={this.navigate.bind(this, 'Login')}
                buttonStyles={{marginTop: 0}}>
                Login
              </Button>
            </View>
          </View>
          {bundleId !== 'com.pikdish' && (
            <Text style={style.poweredByText}>Powered By PIKDISH</Text>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = store => ({
  appTheme: store.theme.appTheme,
  user: store.auth.user,
});

const mapDispatchToProps = {
  setAppTheme: themeAction.setAppTheme,
  setCountryData: themeAction.setCountryData,
  setLocation: authAction.setLocation,
  setCuisine: themeAction.setCuisine,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppDescription);
