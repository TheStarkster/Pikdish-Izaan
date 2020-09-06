import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {connect} from 'react-redux';

import authActions from '../../redux/auth/action';
import ErrorBox from '../../components/ErrorBox';
import Loader from '../../components/Loader';
import helpers from '../../config/helpers';
import Header from '../../components/Header';
import Input2 from '../../components/Input2';
import Button from '../../components/Button';
import CurrentLocationMarker from '../../components/CurrentLocationMarker';
import GeneralStyle from '../GeneralStyle';
import style from './style';
import api from '../../config/api';
import colors from '../../config/colors';

class DeliveryAddress extends Component {
  state = {
    region: null,
    currentLocation: null,
    isLoading: false,
    errorMessage: '',
    label: '',
    address: '',
    errors: {},
  };

  async componentDidMount() {
    try {
      const {navigation} = this.props;
      const {state = {}} = navigation;
      const {params = {}} = state;

      const response = await helpers.requestLocationPermission();

      if (response !== 'granted') throw new Error(response);

      this.getLocation();
      this.setState({fromSearchLocation: params.fromSearchLocation});
    } catch (e) {
      alert(e.message);
    }
  }

  getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {region} = this.state;
        const newRegion = {...region};
        newRegion.latitude = position.coords.latitude;
        newRegion.longitude = position.coords.longitude;
        newRegion.latitudeDelta = 0.002;
        newRegion.longitudeDelta = 0.002;

        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        this.setState({region: newRegion, currentLocation});
      },
      error => {
        // See error code charts below.
        alert(error.message);
      },
      {enableHighAccuracy: true},
    );
  };

  renderMap = () => {
    const {region, currentLocation} = this.state;

    if (!region) return null;

    return (
      <MapView
        style={GeneralStyle.flex1}
        initialRegion={this.state.region}
        onRegionChange={this.onRegionChange}>
        <CurrentLocationMarker location={currentLocation} />
      </MapView>
    );
  };

  onRegionChange = region => {
    this.setState({region});
  };

  handleSetAddressPress = () => {
    const {fromSearchLocation} = this.state;

    if (fromSearchLocation) {
      this.setAddress();
    }
  };

  setAddress = async () => {
    try {
      if (this.validation()) {
        throw new Error('Please fill required fields');
      }

      this.setState({isLoading: true});

      const payload = {
        label_name: this.state.label,
        address: this.state.address,
        user_id: this.props.user.id,
      };

      await api.setAppUserAddress(payload);

      const response = await api.getAppUserAddresses({
        user_id: payload.user_id,
      });

      this.props.setSavedLocations(response.address || []);
      this.props.navigation.navigate('SearchLocation');
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  handleChange = (label, e) => {
    this.setState({[label]: e});
  };

  validation = () => {
    const {label, address} = this.state;
    const errors = {};

    if (!label) {
      errors.label = 'This field is required';
    }

    if (!address) {
      errors.address = 'This field is required';
    }

    this.setState({errors});
    return Object.keys(errors).length;
  };

  render() {
    const {isLoading, errorMessage, errors} = this.state;

    return (
      <View style={GeneralStyle.flex1}>
        <Header></Header>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={[GeneralStyle.flex1, GeneralStyle.backgroundLightGrey]}>
          <View style={[GeneralStyle.flex1]}>
            <View style={style.mapContainer}>{this.renderMap()}</View>
            <View style={[GeneralStyle.flex1, GeneralStyle.justifyCenter]}>
              <View style={[GeneralStyle.container, GeneralStyle.noMarginTop]}>
                <Input2
                  labelStyles={errors.label && {color: colors.RED}}
                  onChangeText={e => this.handleChange('label', e)}
                  label="Location:"
                />
                <Input2
                  labelStyles={errors.address && {color: colors.RED}}
                  onChangeText={e => this.handleChange('address', e)}
                  label="Address:"
                />
                <Input2
                  onChangeText={e => this.handleChange('landmark', e)}
                  label="Landmark:"
                />
              </View>
              <View style={GeneralStyle.alignCenter}>
                <Button
                  onPress={this.handleSetAddressPress}
                  buttonStyles={style.button}>
                  Set Address
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
        {isLoading && <Loader />}
        <ErrorBox
          onClose={() => this.setState({errorMessage: ''})}
          message={errorMessage}
        />
      </View>
    );
  }
}

const mapStateToProps = store => ({
  user: store.auth.user,
});

const mapDispatchToProps = {
  setSavedLocations: authActions.setSavedLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAddress);
