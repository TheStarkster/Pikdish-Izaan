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

import helpers from '../../config/helpers';
import ActivityIndicator from '../../components/ActivityIndicator';
import constants from '../../config/constants';
import api from '../../config/api';
import ItemList from './ItemList';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import Switch from '../../components/Switch';
import FoodCourtSlider from '../../components/FoodCourtSlider';
import style from './style';
import GeneralStyle from '../GeneralStyle';
import FilterPopup from '../../components/FilterPopup';
import selectedRestaurantActions from '../../redux/selectedRestaurant/action';

const data = [
  'https://sifu.unileversolutions.com/image/en-AU/recipe-topvisual/2/1260-709/beef-burger-with-deep-fried-bacon-and-thousand-island-dressing-50247463.jpg',
  'https://sifu.unileversolutions.com/image/en-AU/recipe-topvisual/2/1260-709/beef-burger-with-deep-fried-bacon-and-thousand-island-dressing-50247463.jpg',
  'https://sifu.unileversolutions.com/image/en-AU/recipe-topvisual/2/1260-709/beef-burger-with-deep-fried-bacon-and-thousand-island-dressing-50247463.jpg',
  'https://sifu.unileversolutions.com/image/en-AU/recipe-topvisual/2/1260-709/beef-burger-with-deep-fried-bacon-and-thousand-island-dressing-50247463.jpg',
];

class FoodCourt extends Component {
  constructor() {
    super();

    this.onSwitchChange = this.onSwitchChange.bind(this);
    this.handleReferralModalChange = this.handleReferralModalChange.bind(this);
    this.handleSearchModalChange = this.handleSearchModalChange.bind(this);
  }

  state = {
    isVeg: false,
    isReferralModal: false,
    isSearchModal: false,
    outlets: [],
    filteredOutlets: [],
    topAds: [],
    page: '0',
    cuisine: '',
    isNextPage: true,
    filter: '',
    orderBy: constants.RESTAURANT_ORDER_BY_CODE.RELEVANCE,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      this.setState({isLoading: true});

      const promises = [this.fetchList(), this.fetchTopAds()];

      await Promise.all(promises);
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  fetchList = async () => {
    try {
      const {orderBy, page, cuisine, filter} = this.state;
      const {user, theme, orderType, restaurant} = this.props;

      const location = await this.getLocation();

      const payload = {
        parent_restro_id: restaurant.restaurant_id,
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

      const response = await api.appRestroFoodCourtOutletList(payload);

      const filteredOutlets = this.filterOutlet(response.outlets);

      let lastRestaurantId = '';

      if (response.outlets) {
        if (response.outlets.length) {
          lastRestaurantId = response.outlets[response.outlets.length - 1].id;
        }
      }

      this.setState({
        outlets: response.outlets,
        filteredOutlets,
        lastRestaurantId,
      });

      return 'success';
    } catch (e) {
      throw e;
    }
  };

  fetchTopAds = async () => {
    const {user, theme, orderType} = this.props;

    try {
      const payload = {
        restaurant_id: theme.restaurant_id,
        user_id: user ? user.id : '0',
        order_type: orderType,
      };

      const response = await api.appRestroListPageTopAds(payload);
      this.setState({topAds: response.list});
      return 'success';
    } catch (e) {
      throw e;
    }
  };

  handleSearchModalChange(isSearchModal) {
    this.setState({isSearchModal});
  }

  filterOutlet = (outlets, isVeg, searchTerm) => {
    if (!outlets) {
      outlets = [...this.state.outlets];
    }

    if (isVeg === undefined) {
      isVeg = this.state.isVeg;
    }

    if (!searchTerm) {
      searchTerm = this.state.search;
    }

    let filteredOutlets = outlets;

    if (isVeg === undefined) {
      isVeg = this.state.isVeg;
    }

    // if (isVeg) {
    //   filteredOutlets = outlets.filter(
    //     item => item.food_type === constants.VEG_FOOD_TYPE,
    //   );
    // }
    if (isVeg) {
      filteredOutlets = outlets.filter(item => {
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
      filteredOutlets = outlets.filter(item => {
        if (searchTerm) {
          return item.restaurant_name
            .toLowerCase()
            .startsWith(searchTerm.toLowerCase());
        }

        return true;
      });
    }

    return filteredOutlets;
  };

  onSwitchChange(isVeg) {
    const filteredOutlets = this.filterOutlet(null, isVeg);

    this.setState({isVeg, filteredOutlets});
  }

  handleSortChange = async () => {
    try {
      this.setState({isLoading: true});

      const response = await this.fetchList();

      const filteredOutlets = this.filterOutlet(response.outlets);

      this.setState({outlets: response.outlets, filteredOutlets});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  handleReferralModalChange(isReferralModal, payload) {
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

  onFavChange = (isFav, restaurant) => {
    const {outlets} = this.state;

    const index = outlets.findIndex(item => item.id === restaurant.id);
    const restaurantToChange = {...outlets[index]};

    restaurantToChange.my_fav = isFav ? '1' : '0';

    outlets.splice(index, 1, restaurantToChange);

    const filteredOutlets = this.filterOutlet(outlets);
    this.setState({outlets, filteredOutlets});
  };

  handleHeartClick = value => {
    if (value) {
      this.addFav();
    } else {
      this.removeFav();
    }
  };

  addFav = async () => {
    const {user, restaurant, setSelectedRestaurant} = this.props;

    try {
      this.setState({isLoading: true});

      const payload = {
        user_id: user.id,
        restaurant_id: restaurant.restaurant_id,
      };

      await api.addRestaurantInFavList(payload);

      setSelectedRestaurant({...restaurant, my_fav: '1'});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  removeFav = async () => {
    const {user, restaurant, setSelectedRestaurant} = this.props;

    try {
      this.setState({isLoading: true});

      const payload = {
        user_id: user.id,
        restaurant_id: restaurant.restaurant_id,
      };

      await api.removeRestaurantFromFavList(payload);
      setSelectedRestaurant({...restaurant, my_fav: '0'});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
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

  fetchNextPage = () => {
    const {restaurant} = this.props;
    const {page, isNextPage, outlets} = this.state;

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
        outlets,
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
          parent_restro_id: restaurant.restaurant_id,
        };

        const response = await api.appRestroFoodCourtOutletList(payload);
        const newLastRestaurant = response.outlets
          ? response.outlets[response.outlets.length - 1]
          : null;

        if (response.outlets && !response.outlets.length) {
          return this.setState({isNextPage: false, isLoading2: false});
        }

        if (newLastRestaurant && lastRestaurantId === newLastRestaurant.id) {
          return this.setState({isNextPage: false, isLoading2: false});
        }

        const newRestaurants = [...outlets, ...response.outlets];
        const lastRestaurantId2 = newLastRestaurant.id;

        const filteredOutlets = this.filterOutlet(newRestaurants);

        this.setState({
          outlets: newRestaurants,
          filteredOutlets,
          lastRestaurantId: lastRestaurantId2,
        });
      } catch (e) {
        this.setState({errorMessage: e.message});
      }

      this.setState({isLoading2: false});
    });
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

  isOnPageEnd = (_, height) => {
    const {isLoading, filteredOutlets} = this.state;

    if (
      !isLoading &&
      filteredOutlets.length &&
      height < constants.WINDOW_HEIGHT - 10
    ) {
      this.fetchNextPage();
      return;
    }

    return false;
  };

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
          await this.fetchList();

          this.setState({
            isReferralModal: false,
            isFiltering: false,
          });
        },
      );
    }
  };

  isCloseToBottom = e => {
    const {isLoading} = this.state;
    const {layoutMeasurement, contentOffset, contentSize} = e.nativeEvent;

    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isBottom && !isLoading) {
      this.fetchNextPage();
    }
  };

  handleSearch = e => {
    const {isVeg} = this.state;

    this.setState({search: e}, () => {
      const filteredOutlets = this.filterOutlet(null, isVeg, e);

      this.setState({filteredOutlets});
    });
  };

  render() {
    const {
      isReferralModal,
      isSearchModal,
      isLoading,
      errorMessage,
      filteredOutlets,
      outlets,
      topAds,
      isFiltering,
      isLoading2,
      isNextPage,
      isFiltered,
    } = this.state;
    const {restaurant} = this.props;

    return (
      <View style={GeneralStyle.flex1}>
        <Header
          onHeartClick={this.handleHeartClick}
          heartActive={restaurant.my_fav === '1'}
          onSearchPress={this.handleSearchModalChange.bind(this, true)}
          headerStyles={style.mainHeader}
          isIcons={true}
        />
        <View style={style.header}>
          <Text style={style.headerText}>{restaurant.restaurant_name}</Text>
          <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
            <Image
              style={style.starImage}
              source={require('../../assets/icon/star.png')}
            />
            <Text style={style.headerLabel}>{restaurant.rating}</Text>
            <Text style={style.headerLabel}>|</Text>
            <Text style={style.headerLabel}>{outlets.length} Outlets</Text>
          </View>
        </View>
        <ScrollView
          onContentSizeChange={this.isOnPageEnd}
          onScroll={this.isCloseToBottom}
          style={[GeneralStyle.flex1, GeneralStyle.backgroundLightGrey]}>
          <View style={[GeneralStyle.container, GeneralStyle.noMarginTop]}>
            {!!topAds.length && (
              <FoodCourtSlider
                itemWidthDifference={160}
                containerStyle={style.sliderImageContainer}
                onPress={this.handleAdClick}
                data={topAds}
              />
            )}
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
            <View>
              {filteredOutlets.map((item, i) => (
                <ItemList
                  onFavChange={this.onFavChange}
                  key={i}
                  restaurant={restaurant}
                  data={item}
                />
              ))}
            </View>
            {isNextPage && <ActivityIndicator loading={isLoading2} />}
          </View>
        </ScrollView>
        <FilterPopup
          onClose={this.handleReferralModalChange}
          visible={isReferralModal}
          isFiltering={isFiltering}
          onFilter={this.applyFilter}
        />
        <SearchModal
          value={this.state.search}
          onChangeText={this.handleSearch}
          onClose={this.handleSearchModalChange}
          visible={isSearchModal}
        />
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
  theme: store.theme.appTheme,
  user: store.auth.user,
  restaurant: store.selectedRestaurant.restaurant,
  orderType: store.selectedRestaurant.orderType,
});

const mapDispatchToProps = {
  setSelectedRestaurant: selectedRestaurantActions.setSelectedRestaurant,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FoodCourt);
