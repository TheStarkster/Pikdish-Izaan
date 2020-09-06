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

class RestaurantListingAds extends Component {
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

  componentDidMount() {
    this.fetchData();
  }

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

  fetchData = async shouldNotLoad => {
    const {user, orderType} = this.props;

    try {
      if (!shouldNotLoad) {
        this.setState({isLoading: true});
      }

      const payload = {
        type: '',
        order_type: orderType,
        user_id: user ? user.id : '0',
      };

      const response = await api.appRestroListPageTopAdsData(payload);
      const restaurants = Array.isArray(response.list)
        ? response.list.flat()
        : [];

      const filteredRestaurant = this.filterRestaurant(restaurants);

      this.setState({
        restaurants,
        filteredRestaurant,
      });
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
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
          isFiltering: true,
          isNextPage: true,
          page: '0',
        },
        async () => {
          await this.fetchData(true);

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
    const {filteredRestaurant} = this.state;

    return filteredRestaurant.map((item, i) => (
      <ItemList onFavChange={this.onFavChange} key={i} data={item} />
    ));
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

  // fetchNextPage = () => {
  //   const {page, isNextPage} = this.state;

  //   if (!isNextPage) {
  //     return;
  //   }

  //   this.setState({isLoading2: true});

  //   const newPage = Number(page) + 1;

  //   this.setState({page: newPage.toString()}, async () => {
  //     const {
  //       page,
  //       cuisine,
  //       filter,
  //       orderBy,
  //       restaurants,
  //       lastRestaurantId,
  //     } = this.state;
  //     const {user, theme, orderType} = this.props;

  //     try {
  //       const location = await this.getLocation();

  //       const payload = {
  //         restaurant_id: theme.restaurant_id,
  //         order_by: orderBy,
  //         order_type: orderType,
  //         user_id: user ? user.id : '0',
  //         lat: location.latitude,
  //         lng: location.longitude,
  //         page: page,
  //         cuisine_id: cuisine,
  //         filter: filter,
  //       };

  //       const response = await api.appRestroList(payload);
  //       const newLastRestaurant = response.restro
  //         ? response.restro[response.restro.length - 1]
  //         : null;

  //       if (response.restro && !response.restro.length) {
  //         return this.setState({isNextPage: false, isLoading2: false});
  //       }

  //       if (newLastRestaurant && lastRestaurantId === newLastRestaurant.id) {
  //         return this.setState({isNextPage: false, isLoading2: false});
  //       }

  //       const newRestaurants = [...restaurants, ...response.restro];
  //       const lastRestaurantId2 = newLastRestaurant.id;

  //       const filteredRestaurant = this.filterRestaurant(newRestaurants);

  //       this.setState({
  //         restaurants: newRestaurants,
  //         filteredRestaurant,
  //         lastRestaurantId: lastRestaurantId2,
  //       });
  //     } catch (e) {
  //       this.setState({errorMessage: e.message});
  //     }

  //     this.setState({isLoading2: false});
  //   });
  // };

  isOnPageEnd = (_, height) => {
    // const {isLoading, filteredRestaurant} = this.state;
    // if (
    //   !isLoading &&
    //   filteredRestaurant.length &&
    //   height < constants.WINDOW_HEIGHT - 10
    // ) {
    //   this.fetchNextPage();
    //   return;
    // }
    // return false;
  };

  render() {
    const {
      isReferralModal,
      isSearchModal,
      isLoading,
      errorMessage,
      // filteredRestaurant,
      topAds,
      isFiltering,
      isFiltered,
      isLoading2,
      isNextPage,
    } = this.state;

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantListingAds);
