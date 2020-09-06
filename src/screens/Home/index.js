import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../config/api';
import themeActions from '../../redux/theme/action';
import authActions from '../../redux/auth/action';
import selectedRestaurantActions from '../../redux/selectedRestaurant/action';
import constants from '../../config/constants';
import style from './style';
import GeneralStyles from '../../screens/GeneralStyle';
import DropdownHeader from '../../components/DropdownHeader';

const data = [
  {
    image: 'table_order_image',
    text: 'Table Order/Dine in',
    route: 'QRCamera',
    params: {type: 'Table Order', orderType: constants.TABLE_ORDER_TYPE},
  },
  {
    image: 'pre_order_image',
    text: 'Pre-Order/Table Booking',
    route: 'RestaurantListing',
    params: {type: 'Pre-Order', orderType: constants.PRE_ORDER_TYPE},
  },
  {
    image: 'take_away_image',
    text: 'Take Away',
    route: 'RestaurantListing',
    params: {type: 'Take Away', orderType: constants.TAKE_AWAY_TYPE},
  },
  {
    image: 'delivery_image',
    text: 'Delivery By Restaurant',
    route: 'RestaurantListing',
    params: {type: 'Delivery', orderType: constants.DELIVERY_TYPE},
  },
  {
    image: 'event_image',
    text: 'Event',
    route: 'EventsListPage',
    params: {orderType: constants.EVENT_TYPE},
  },
];

class Home extends Component {
  state = {
    features: null,
    theme: null,
  };

  async componentDidMount() {
    const {theme} = this.props;

    const address = await AsyncStorage.getItem('address');
    await AsyncStorage.removeItem('address');

    if (address) {
      this.props.setLocation(address);
    }

    this.fetchCuisine(theme);

    this.setState({features: theme.pikdish_feature.split(', '), theme});
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

  navigate(route, params) {
    this.props.setSelectedOrderType(params.orderType);
    this.props.navigation.navigate(route, params);
  }

  renderFeatures = () => {
    const {theme} = this.props;
    const {features} = this.state;
    const jsx = [];

    for (let i = 0; i < data.length; i++) {
      const toFind = (i + 1).toString();

      if (features.indexOf(toFind) !== -1) {
        const item = data[i];

        jsx.push(
          <Box
            theme={theme}
            key={Math.random().toString()}
            onPress={this.navigate.bind(this, item.route, item.params)}
            data={item}
          />,
        );
      }
    }

    return jsx;
  };

  render() {
    const {features} = this.state;

    if (!features) return null;

    return (
      <View style={GeneralStyles.flex1}>
        <StatusBar
          networkActivityIndicatorVisible={true}
          backgroundColor="white"
          barStyle="dark-content"
          translucent={false}
        />
        <DropdownHeader />
        <View style={[GeneralStyles.flex1]}>
          <ScrollView>
            <View style={[GeneralStyles.container, style.homeContainer]}>
              {this.renderFeatures()}
              <View style={style.box}></View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = store => ({theme: store.theme.appTheme});

const mapDispatchToProps = {
  setSelectedOrderType: selectedRestaurantActions.setSelectedOrderType,
  setLocation: authActions.setLocation,
  setCuisine: themeActions.setCuisine,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const Box = props => {
  const url = props.theme.exp_image_path + '/' + props.theme[props.data.image];

  return (
    <TouchableOpacity onPress={props.onPress} style={[style.box]}>
      <Image resizeMode="cover" source={{uri: url}} style={style.bgImage} />
      <View
        style={[
          style.textContainer,
          {backgroundColor: props.theme.theme_colour},
        ]}>
        <Text style={style.imageText}>{props.data.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

Box.defaultProps = {
  onPress: function() {},
};
