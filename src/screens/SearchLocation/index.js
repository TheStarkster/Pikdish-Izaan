import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import styles from './style';
import RoundInput from '../../components/RoundInput';
import { connect } from 'react-redux';

import authActions from '../../redux/auth/action';
import ErrorBox from '../../components/ErrorBox';
import Loader from '../../components/Loader';
import api from '../../config/api';
import Header from '../../components/Header';
import GeneralStyles from '../GeneralStyle';
import SavedAddress from './SavedAddress';

const recentLocations = [
  'Hl Area Phase II, Basni',
  'Hl Area Phase II, Basni',
  'Hl Area Phase II, Basni',
  'Hl Area Phase II, Basni',
  'Hl Area Phase II, Basni',
];

class SearchLocation extends Component {
  state = {
    isLoading: false,
    errorMessage: '',
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const { user, setSavedLocations } = this.props;
      
      if (!user) {
        return;
      }
      
      this.setState({ isLoading: true });

      const payload = {
        user_id: user.id,
      };

      const response = await api.getAppUserAddresses(payload);

      setSavedLocations(response.address || []);
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }

    this.setState({ isLoading: false });
  };

  navigate = (route, params = {}) => {
    this.props.navigation.navigate(route, params);
  };

  render() {
    const { savedLocations = [] } = this.props;
    const { isLoading, errorMessage } = this.state;

    return (
      <View style={GeneralStyles.flex1}>
        <Header>Search Location</Header>
        <ScrollView contentContainerStyle={GeneralStyles.flexGrow1}>
          <View style={styles.mainContainer}>
            <View style={[GeneralStyles.container, GeneralStyles.noMarginTop]}>
              <RoundInput />
              <View style={styles.currentLocationContainer}>
                <TouchableOpacity>
                  <Text style={styles.currentLocationText}>
                    Use Current Location
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.savedAddressText}>Saved Addresses</Text>
              {savedLocations.map(item => (
                <SavedAddress key={item.id} data={item} />
              ))}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={this.navigate.bind(this, 'DeliveryAddress', {
                    fromSearchLocation: true,
                  })}>
                  <Text style={styles.addAddressText}>+ Add Address</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.recentLocationText}>Recent Locations</Text>
              {recentLocations.map((val, i) => (
                <Text key={i} style={styles.recentLocations}>
                  {val}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>
        {isLoading && <Loader />}
        <ErrorBox
          message={errorMessage}
          onClose={() => this.setState({ errorMessage: '' })}
        />
      </View>
    );
  }
}

const mapStateToProps = store => ({
  user: store.auth.user,
  savedLocations: store.auth.savedLocations,
});

const mapDispatchToProps = {
  setSavedLocations: authActions.setSavedLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchLocation);
