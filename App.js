import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { Platform, SafeAreaView } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './src/redux';
import authActions from './src/redux/auth/action';
import constants from './src/config/constants';
import ErrorBox from './src/components/ErrorBox';
import api from './src/config/api';
import helpers from './src/config/helpers';
import Navigation from './src/navigation';

const App = () => {
  const [mountApp, setMountApp] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    handleMount();
  }, []);

  async function getAddress() {
    try {
      const locationResponse = await helpers.getLocation();
      const location = {
        latitude: locationResponse.coords.latitude,
        longitude: locationResponse.coords.longitude,
      };

      const payload = {
        country_name: 'India',
        user_lat: location.latitude,
        user_long: location.longitude,
      };

      const payload2 = {
        latitude: location.latitude,
        longitude: location.longitude,
        key: constants.GOOGLE_MAP_API_KEY,
      };

      const promises = [
        api.appGetCountryData(payload),
        api.geocodeAddress(payload2),
      ];

      const responses = await Promise.all(promises);

      const response = responses[0];
      const addresses = responses[1];

      let address = '';

      if (addresses.results[0]) {
        address = addresses.results[0].formatted_address;
      }

      await AsyncStorage.setItem('country', JSON.stringify(response.country));
      await AsyncStorage.setItem('address', address);

      return 'success';
    } catch (e) {
      return 'success';
    }
  }

  async function getLocation() {
    try {
      const location = await helpers.requestLocationPermission();

      return location;
    } catch (e) {
      return e.message;
    }
  }

  async function handleMount() {
    try {
      console.disableYellowBox = true;

      const os = Platform.OS;
      const previousData = await AsyncStorage.getItem('theme');
      // const location = await getLocation();

      // if (location === 'granted') {
      //   const previousAddress = await AsyncStorage.getItem('address');

      //   if (previousAddress) {
      //     getAddress();
      //   } else {
      //     await getAddress();
      //   }
      // }

      if (previousData) {
        setMountApp(true);
        return SplashScreen.hide();
        // return setTimeout(() => {
        // }, 2000);
      }

      const bundleId = DeviceInfo.getBundleId();
      const payload = {
        android_build_id: bundleId,
        ios_build_id: bundleId,
        restaurant_id: '1',
      };

      if (os === 'ios') payload.android_build_id = '';
      else payload.ios_build_id = '';

      if (!previousData) {
        const response = await api.fetchAppTheme(payload);

        await AsyncStorage.setItem(
          'theme',
          JSON.stringify(response.restaurant),
        );
      }
    } catch (e) {
      alert(e.message);
    }

    setMountApp(true);
    SplashScreen.hide();
    // setTimeout(() => {
    // }, 2000);
  }

  if (!mountApp) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          {/* <SafeAreaView style={{flex: 1}}> */}
            <Navigation />
            <ErrorBox
              message={error}
              visible={!!error}
              onClose={() => setError('')}
            />
          {/* </SafeAreaView> */}
        </>
      </PersistGate>
    </Provider>
  );
};

export default App;
