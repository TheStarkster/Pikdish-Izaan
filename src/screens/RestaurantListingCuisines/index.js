import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import SearchModal from '../../components/SearchModal';
import {connect} from 'react-redux';

import selectedRestaurantActions from '../../redux/selectedRestaurant/action';
import ActivityIndicator from '../../components/ActivityIndicator';
import ErrorBox from '../../components/ErrorBox';
import Loader from '../../components/Loader';
import api from '../../config/api';
import ItemList from './ItemList';
import Header from '../../components/Header';
import PopularBrandSlider from '../../components/PopularBrandSlider';
import Switch from '../../components/Switch';
import FoodCourtSlider from '../../components/FoodCourtSlider';
import style from './style';
import GeneralStyle from '../GeneralStyle';
import FilterPopup from '../../components/FilterPopup';
import constants from '../../config/constants';

const data = [
  'https://sifu.unileversolutions.com/image/en-AU/recipe-topvisual/2/1260-709/beef-burger-with-deep-fried-bacon-and-thousand-island-dressing-50247463.jpg',
  'https://sifu.unileversolutions.com/image/en-AU/recipe-topvisual/2/1260-709/beef-burger-with-deep-fried-bacon-and-thousand-island-dressing-50247463.jpg',
  'https://sifu.unileversolutions.com/image/en-AU/recipe-topvisual/2/1260-709/beef-burger-with-deep-fried-bacon-and-thousand-island-dressing-50247463.jpg',
  'https://sifu.unileversolutions.com/image/en-AU/recipe-topvisual/2/1260-709/beef-burger-with-deep-fried-bacon-and-thousand-island-dressing-50247463.jpg',
];

class RestaurantListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVeg: false,
      isReferralModal: false,
      isSearchModal: false,
      isLoading: false,
      errorMessage: '',
      restaurants: [],
      filteredRestaurant: [],
      topAds: [],
      middleVegAds: [],
      restroDisAds: [],
      middleCuisinesAds: [],
      restroUnder100Ad: [],
      restroFiftyPerOffAd: [],
      restroNewRestroAds: [],
      restroBrandAd: [],
      selectedCuisine: {},
      search: '',
      type:
        props.navigation.params &&
        props.navigation.params.state &&
        props.navigation.params.state.type,
      page: '0',
      cuisine: '',
      orderBy: constants.RESTAURANT_ORDER_BY_CODE.RELEVANCE,
      filter: '',
      lastRestaurantId: '',
      isNextPage: true,
      isFiltered: false,
      isLoading2: false,
      isFiltering: false,
    };

    this.onSwitchChange = this.onSwitchChange.bind(this);
    this.handleReferralModalChange = this.handleReferralModalChange.bind(this);
    this.handleSearchModalChange = this.handleSearchModalChange.bind(this);
    this.handleLocationClick = this.handleLocationClick.bind(this);
  }

  async componentDidMount() {
    const {navigation} = this.props;

    if (
      navigation.state &&
      navigation.state.params &&
      navigation.state.params.type === 'cuisine'
    ) {
      this.setState({selectedCuisine: navigation.state.params.cuisine}, () => {
        this.fetchRestaurantByCuisine();
      });
    }
  }

  fetchRestaurantByCuisine = async (shouldNotLoad = false) => {
    const {navigation, user, orderType} = this.props;
    const {selectedCuisine, orderBy} = this.state;

    try {
      if (!shouldNotLoad) {
        this.setState({isLoading: true});
      }

      const payload = {
        order_type: orderType,
        cuisine_id: selectedCuisine.cuisine_id,
        order_by: orderBy,
        user_id: user ? user.id : '0',
      };

      const response = await api.getRestroListByCuisine(payload);

      const filteredRestaurant = this.filterRestaurant(response.restro);

      this.setState({
        restaurants: response.restro,
        filteredRestaurant,
      });
    } catch (e) {
      this.setState({
        errorMessage: e.message,
        restaurants: [],
        filteredRestaurant: [],
      });
    }

    this.setState({isLoading: false});
  };

  fetchTopAds = async () => {
    const {user, theme, navigation, orderType} = this.props;

    const payload = {
      restaurant_id: theme.restaurant_id,
      user_id: user ? user.id : '0',
      order_type: orderType,
    };

    const response = await api.appRestroListPageTopAds(payload);

    this.setState({topAds: response.list});

    return {message: 'Success'};
  };

  getLocation = async () => {
    const dummyLocation = {latitude: '1', longitude: '1'};

    try {
      const location = await helpers.requestLocationPermission();

      if (location === 'granted') {
        const locationResponse = await helpers.getLocation();

        const location = {
          latitude: locationResponse.coords.latitude,
          longitude: locationResponse.coords.longitude,
        };

        return location;
      }

      return dummyLocation;
    } catch (e) {
      return dummyLocation;
    }
  };

  fetchData = async () => {
    const {page, cuisine, filter, orderBy} = this.state;
    const {user, theme, orderType} = this.props;

    const location = await this.getLocation();

    const payload = {
      restaurant_id: theme.restaurant_id,
      order_by: orderBy,
      order_type: orderType,
      user_id: user ? user.id : '0',
      lat: location.latitude,
      lng: location.longitude,
      page: page,
      cuisine_id: cuisine,
      filter: filter,
    };

    const response = await api.appRestroList(payload);

    const filteredRestaurant = this.filterRestaurant(response.restro);

    const lastRestaurantId = response.restro[response.restro.length - 1]
      ? response.restro[response.restro.length - 1].id
      : '';

    this.setState({
      restaurants: response.restro,
      filteredRestaurant: filteredRestaurant,

      lastRestaurantId,
    });

    return {message: 'Success'};
  };

  fetchRestroDisAds = async () => {
    const {user, theme, orderType} = this.props;

    const payload = {
      restaurant_id: theme.restaurant_id,
      foodcourt_restro_id: '0',
      order_type: orderType,
      user_id: user ? user.id : '0',
    };

    const response = await api.appRestroMiddleRestroDisAds(payload);

    this.setState({restroDisAds: response.list});

    return {message: 'Success'};
  };

  fetchMiddleVegAds = async () => {
    const {user, theme, orderType} = this.props;

    const payload = {
      restaurant_id: theme.restaurant_id,
      foodcourt_restro_id: '0',
      order_type: orderType,
      user_id: user ? user.id : '0',
    };

    const response = await api.appRestroMiddleVegAds(payload);

    this.setState({middleVegAds: response.outlets});

    return {message: 'Success'};
  };

  fetchMiddleCuisinesAds = async () => {
    const {user, theme, orderType} = this.props;

    const payload = {
      restaurant_id: theme.restaurant_id,
      foodcourt_restro_id: '0',
      order_type: orderType,
      user_id: user ? user.id : '0',
    };

    const response = await api.appRestroMiddleCuisinesAds(payload);

    this.setState({middleCuisinesAds: response.list || []});

    return {message: 'Success'};
  };

  fetchRestroUnder100Ad = async () => {
    const {user, theme, orderType} = this.props;

    const payload = {
      restaurant_id: theme.restaurant_id,
      foodcourt_restro_id: '0',
      order_type: orderType,
      user_id: user ? user.id : '0',
    };

    const response = await api.appRestroUnder100Ad(payload);

    this.setState({restroUnder100Ad: response.list || []});

    return {message: 'Success'};
  };

  fetchRestroFiftyPerOffAd = async () => {
    const {user, theme, orderType} = this.props;

    const payload = {
      restaurant_id: theme.restaurant_id,
      foodcourt_restro_id: '0',
      order_type: orderType,
      user_id: user ? user.id : '0',
    };

    const response = await api.appRestroFiftyPerOffAd(payload);

    this.setState({restroFiftyPerOffAd: response.list || []});

    return {message: 'Success'};
  };

  fetchRestroNewRestroAds = async () => {
    const {user, theme, orderType} = this.props;

    const payload = {
      restaurant_id: theme.restaurant_id,
      foodcourt_restro_id: '0',
      order_type: orderType,
      user_id: user ? user.id : '0',
    };

    const response = await api.appRestroNewRestroAds(payload);

    this.setState({restroNewRestroAds: response.list || []});

    return {message: 'Success'};
  };

  fetchRestroBrandAd = async () => {
    const {user, theme, orderType} = this.props;

    const payload = {
      restaurant_id: theme.restaurant_id,
      foodcourt_restro_id: '0',
      order_type: orderType,
      user_id: user ? user.id : '0',
    };

    const response = await api.appRestroBrandAd(payload);

    this.setState({restroBrandAd: response.list || []});

    return {message: 'Success'};
  };

  handleSearchModalChange(isSearchModal) {
    this.setState({isSearchModal});
  }

  onSwitchChange(isVeg) {
    const filteredRestaurant = this.filterRestaurant(
      this.state.restaurants,
      isVeg,
    );

    this.setState({isVeg, filteredRestaurant});
  }

  filterRestaurant = (data, isVeg, searchTerm) => {
    if (!data) {
      data = this.state.restaurants;
    }

    if (!searchTerm) {
      searchTerm = this.state.search;
    }

    let filteredRestaurant = data;

    if (isVeg === undefined) {
      isVeg = this.state.isVeg;
    }

    if (isVeg) {
      filteredRestaurant = data.filter(item => {
        if (searchTerm) {
          return (
            item.restaurant_name
              .toLowerCase()
              .startsWith(searchTerm.toLowerCase()) &&
            item.food_type === constants.VEG_FOOD_TYPE
          );
        }

        return item.food_type === constants.VEG_FOOD_TYPE;
      });
    } else {
      filteredRestaurant = data.filter(item => {
        if (searchTerm) {
          return item.restaurant_name
            .toLowerCase()
            .startsWith(searchTerm.toLowerCase());
        }

        return true;
      });
    }

    return filteredRestaurant;
  };

  handleReferralModalChange(isReferralModal, payload = {}) {
    if (
      (payload.sort !== '' &&
        payload.sort !== constants.RESTAURANT_ORDER_BY_CODE.RELEVANCE) ||
      payload.cuisine !== '' ||
      payload.filter !== ''
    ) {
      this.setState({isFiltered: true});
    } else {
      this.setState({isFiltered: false});
    }

    this.setState({isReferralModal});
  }

  applyFilter = async payload => {
    if (payload) {
      this.setState(
        {
          orderBy: payload.sort,
          cuisine: payload.cuisine,
          filter: payload.filter,
          selectedCuisine: {
            cuisine_id: payload.cuisine,
            cuisine_name: payload.cuisineName,
          },
          isFiltering: true,
          isNextPage: true,
          page: '0',
        },
        async () => {
          await this.fetchRestaurantByCuisine(true);

          this.setState({isReferralModal: false, isFiltering: false});
        },
      );
    }
  };

  handleLocationClick() {
    this.props.navigation.navigate('SearchLocation');
  }

  navigate = () => {
    let params = {};

    if (this.props.navigation.state && this.props.navigation.state.params) {
      params = this.props.navigation.state.params;
    }

    this.props.navigation.navigate('RestaurantItems', params);
  };

  onFavChange = (isFav, restaurant) => {
    const {restaurants} = this.state;

    const index = restaurants.findIndex(item => item.id === restaurant.id);
    const restaurantToChange = {...restaurants[index]};

    restaurantToChange.my_fav = isFav ? '1' : '0';

    restaurants.splice(index, 1, restaurantToChange);

    const filteredRestaurant = this.filterRestaurant(restaurants);
    this.setState({restaurants, filteredRestaurant});
  };

  renderItems = () => {
    const {
      filteredRestaurant,
      restroDisAds,
      middleVegAds,
      middleCuisinesAds,
      restroUnder100Ad,
      restroFiftyPerOffAd,
      restroNewRestroAds,
      restroBrandAd,
    } = this.state;

    const elements = [];

    for (let i = 0; i < 4; i++) {
      const item = filteredRestaurant[i];

      if (!item) break;

      elements.push(
        <ItemList onFavChange={this.onFavChange} key={i} data={item} />,
      );
    }

    if (filteredRestaurant.length >= 4 && restroDisAds.length) {
      elements.push(
        <PopularBrandSlider
          data={restroDisAds}
          heading="Restaurants Discount"
        />,
      );
    }

    if (filteredRestaurant.length >= 4) {
      for (let i = 4; i < 8; i++) {
        const item = filteredRestaurant[i];

        if (!item) break;

        elements.push(
          <ItemList onFavChange={this.onFavChange} key={i} data={item} />,
        );
      }
    }

    if (filteredRestaurant.length >= 8 && middleVegAds.length) {
      elements.push(
        <PopularBrandSlider data={middleVegAds} heading="Veg Restaurants" />,
      );
    }

    if (filteredRestaurant.length >= 8) {
      for (let i = 8; i < 12; i++) {
        const item = filteredRestaurant[i];

        if (!item) break;

        elements.push(
          <ItemList onFavChange={this.onFavChange} key={i} data={item} />,
        );
      }
    }

    if (filteredRestaurant.length >= 12 && middleCuisinesAds.length) {
      elements.push(
        <PopularBrandSlider
          type="cuisine"
          data={middleCuisinesAds}
          heading="Cuisines"
        />,
      );
    }

    if (filteredRestaurant.length >= 12) {
      for (let i = 12; i < 16; i++) {
        const item = filteredRestaurant[i];

        if (!item) break;

        elements.push(
          <ItemList onFavChange={this.onFavChange} key={i} data={item} />,
        );
      }
    }

    if (filteredRestaurant.length >= 16 && restroUnder100Ad.length) {
      elements.push(
        <PopularBrandSlider
          data={restroUnder100Ad}
          heading="Restaurant under 100"
        />,
      );
    }

    if (filteredRestaurant.length >= 16) {
      for (let i = 16; i < 20; i++) {
        const item = filteredRestaurant[i];

        if (!item) break;

        elements.push(
          <ItemList onFavChange={this.onFavChange} key={i} data={item} />,
        );
      }
    }

    if (filteredRestaurant.length >= 20 && restroFiftyPerOffAd.length) {
      elements.push(
        <PopularBrandSlider
          data={restroFiftyPerOffAd}
          heading="Restaurant Fifty Per Off Ad"
        />,
      );
    }

    if (filteredRestaurant.length >= 20) {
      for (let i = 20; i < 24; i++) {
        const item = filteredRestaurant[i];

        if (!item) break;

        elements.push(
          <ItemList onFavChange={this.onFavChange} key={i} data={item} />,
        );
      }
    }

    if (filteredRestaurant.length >= 24 && restroNewRestroAds.length) {
      elements.push(
        <PopularBrandSlider
          data={restroNewRestroAds}
          heading="Restaurant new Restro Ads"
        />,
      );
    }

    if (filteredRestaurant.length >= 24) {
      for (let i = 24; i < 28; i++) {
        const item = filteredRestaurant[i];

        if (!item) break;

        elements.push(
          <ItemList onFavChange={this.onFavChange} key={i} data={item} />,
        );
      }
    }

    if (filteredRestaurant.length >= 28 && restroBrandAd.length) {
      elements.push(
        <PopularBrandSlider
          data={restroBrandAd}
          heading="Restaurant Brand Ad"
        />,
      );
    }

    if (filteredRestaurant.length >= 28) {
      for (let i = 28; i < filteredRestaurant.length; i++) {
        const item = filteredRestaurant[i];

        if (!item) break;

        elements.push(
          <ItemList onFavChange={this.onFavChange} key={i} data={item} />,
        );
      }
    }

    return elements;
  };

  handleSearch = e => {
    const {isVeg} = this.state;

    this.setState({search: e}, () => {
      const filteredRestaurant = this.filterRestaurant(null, isVeg, e);

      this.setState({filteredRestaurant});
    });
  };

  isCloseToBottom = e => {
    // const {isLoading2} = this.state;
    // const {layoutMeasurement, contentOffset, contentSize} = e.nativeEvent;
    // const isBottom =
    //   layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    // if (isBottom && !isLoading2) {
    //   this.fetchNextPage();
    // }
  };

  fetchNextPage = () => {
    const {page, isNextPage} = this.state;

    if (!isNextPage) {
      return;
    }

    this.setState({isLoading2: true});

    const newPage = Number(page) + 1;

    this.setState({page: newPage.toString()}, async () => {
      const {
        page,
        cuisine,
        filter,
        orderBy,
        restaurants,
        lastRestaurantId,
      } = this.state;
      const {user, theme, orderType} = this.props;

      try {
        const location = await this.getLocation();

        const payload = {
          restaurant_id: theme.restaurant_id,
          order_by: orderBy,
          order_type: orderType,
          user_id: user ? user.id : '0',
          lat: location.latitude,
          lng: location.longitude,
          page: page,
          cuisine_id: cuisine,
          filter: filter,
        };

        const response = await api.appRestroList(payload);
        const newLastRestaurant = response.restro
          ? response.restro[response.restro.length - 1]
          : null;

        if (response.restro && !response.restro.length) {
          return this.setState({isNextPage: false, isLoading2: false});
        }

        if (newLastRestaurant && lastRestaurantId === newLastRestaurant.id) {
          return this.setState({isNextPage: false, isLoading2: false});
        }

        const newRestaurants = [...restaurants, ...response.restro];
        const lastRestaurantId2 = newLastRestaurant.id;

        const filteredRestaurant = this.filterRestaurant(newRestaurants);

        this.setState({
          restaurants: newRestaurants,
          filteredRestaurant,
          lastRestaurantId: lastRestaurantId2,
        });
      } catch (e) {
        this.setState({errorMessage: e.message});
      }

      this.setState({isLoading2: false});
    });
  };

  isOnPageEnd = (_, height) => {
    const {isLoading, filteredRestaurant} = this.state;

    // if (
    //   !isLoading &&
    //   filteredRestaurant.length &&
    //   height < constants.WINDOW_HEIGHT - 10
    // ) {
    //   this.fetchNextPage();
    //   return;
    // }

    return false;
  };

  handleAdClick = item => {
    const {setSelectedRestaurant} = this.props;

    if (item.link_restaurant_id === '0') {
      this.props.navigation.navigate('RestaurantListingAds');
    } else {
      setSelectedRestaurant({restaurant_id: item.link_restaurant_id});

      this.props.navigation.navigate('RestaurantItems');
    }
  };

  render() {
    const {
      isReferralModal,
      isSearchModal,
      isLoading,
      errorMessage,
      isFiltering,
      isFiltered,
      isLoading2,
      isNextPage,
      selectedCuisine,
    } = this.state;
    const {theme} = this.props;

    return (
      <View style={GeneralStyle.flex1}>
        <Header
          onLocationClick={this.handleLocationClick}
          showLocationButton={true}
          onSearchPress={this.handleSearchModalChange.bind(this, true)}
          headerStyles={style.mainHeader}
          isIcons={true}
          showHeart={false}></Header>
        <ScrollView
          onContentSizeChange={this.isOnPageEnd}
          onScroll={this.isCloseToBottom}
          style={[GeneralStyle.flex1, GeneralStyle.backgroundLightGrey]}>
          <View style={[GeneralStyle.container, GeneralStyle.noMarginTop]}>
            <View style={style.cuisineIndicatorContainer}>
              <Text style={style.cuisineIndicatorLabel}>Cuisine: </Text>
              <Text
                style={[
                  style.cuisineIndicatorValue,
                  {color: theme.theme_colour},
                ]}>
                {selectedCuisine.cuisine_name}
              </Text>
            </View>
            <View style={style.afterSlider}>
              <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
                <Text style={style.veg}>VEG</Text>
                <Switch
                  onValueChange={this.onSwitchChange}
                  value={this.state.isVeg}
                />
              </View>
              <TouchableWithoutFeedback
                onPress={() => this.setState({isReferralModal: true})}>
                <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
                  <Image
                    style={style.filterIcon}
                    source={require('../../assets/icon/settings.png')}
                    resizeMode="cover"
                  />
                  <Text
                    style={[
                      style.filterText,
                      isFiltered && GeneralStyle.fontRed,
                    ]}>
                    SORT
                  </Text>
                  <Text
                    style={[
                      style.filterText,
                      isFiltered && GeneralStyle.fontRed,
                    ]}>
                    |
                  </Text>
                  <Text
                    style={[
                      style.filterText,
                      isFiltered && GeneralStyle.fontRed,
                    ]}>
                    FILTER
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={GeneralStyle.mediumMarginTop}>
              {this.renderItems()}
              {/* <PopularBrandSlider /> */}
            </View>
            {isNextPage && <ActivityIndicator loading={isLoading2} />}
          </View>
        </ScrollView>
        <FilterPopup
          onClose={this.handleReferralModalChange}
          isFiltering={isFiltering}
          onFilter={this.applyFilter}
          visible={isReferralModal}
        />
        <SearchModal
          value={this.state.search}
          onChangeText={this.handleSearch}
          onClose={this.handleSearchModalChange}
          visible={isSearchModal}
        />
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
  user: store.auth.user,
  theme: store.theme.appTheme,
  location: store.auth.location,
  restaurant: store.selectedRestaurant.restaurant,
  orderType: store.selectedRestaurant.orderType,
});

const mapDispatchToProps = {
  setSelectedRestaurant: selectedRestaurantActions.setSelectedRestaurant,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantListing);
