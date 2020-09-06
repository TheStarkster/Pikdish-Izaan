import React, {PureComponent} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import SearchModal from '../../components/SearchModal';
import {connect} from 'react-redux';

import ActivityIndicator from '../../components/ActivityIndicator';
import CategoryAccordion2 from '../../components/CategoryAccordion2';
import Body from './Body';
import api from '../../config/api';
import ItemList from './ItemList';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import Header from '../../components/Header';
import constants from '../../config/constants';
// import PopularBrandSlider from '../../components/PopularBrandSlider';
import Switch from '../../components/Switch';
import style from './style';
import GeneralStyle from '../GeneralStyle';
import FilterPopup from '../../components/FilterPopup';

class FavouriteRestaurants extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isVeg: false,
      isReferralModal: false,
      isLoading: false,
      isSearchModal: false,
      filteredRestaurants: [],
      restaurants: [],
      current: '',
      cuisine: '',
      filter: '',
      orderBy: constants.RESTAURANT_ORDER_BY_CODE.RELEVANCE,
      page: '0',
      search: '',
      isNextPage: true,
    };

    this.onSwitchChange = this.onSwitchChange.bind(this);
    this.handleReferralModalChange = this.handleReferralModalChange.bind(this);
    this.handleSearchModalChange = this.handleSearchModalChange.bind(this);
  }

  componentDidMount() {
    this.fetchFavRestaurants();
  }

  fetchFavRestaurants = async (shouldLoad = true) => {
    const {page, cuisine, filter, orderBy} = this.state;
    const {user} = this.props;

    try {
      this.setState({isLoading: shouldLoad});

      const payload = {
        order_by: orderBy,
        user_id: user.id,
        page,
        cuisine_id: cuisine,
        filter: filter,
      };

      const response = await api.getMyFavRestroList(payload);

      if (response.data) {
        response.restro = [...response.data];
      }

      const filteredRestaurants = this.filterRestaurant(response.restro);

      const lastRestaurantId = response.restro[response.restro.length - 1]
        ? response.restro[response.restro.length - 1].id
        : '';

      this.setState({
        restaurants: response.restro,
        filteredRestaurants,
        lastRestaurantId,
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
    let filteredRestaurants = this.filterRestaurant(null, isVeg, null);

    this.setState({isVeg, filteredRestaurants});
  }

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

  removeFavRestaurant = async id => {
    const {user} = this.props;

    try {
      // this.setState({isLoading: true});

      const payload = {user_id: user.id, restaurant_id: id};

      await api.removeRestaurantFromFavList(payload);

      this.fetchFavRestaurants(false);
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    // this.setState({isLoading: false});
  };

  filterRestaurant = (data, isVeg, search) => {
    if (!data) {
      data = this.state.restaurants;
    }

    if (!search) {
      search = this.state.search;
    }

    let filteredRestaurant = data;

    if (isVeg === undefined) {
      isVeg = this.state.isVeg;
    }

    if (isVeg) {
      filteredRestaurant = data.filter(item => {
        if (search) {
          return (
            item.restaurant_name
              .toLowerCase()
              .startsWith(search.toLowerCase()) &&
            item.food_type === constants.VEG_FOOD_TYPE
          );
        }

        return item.food_type === constants.VEG_FOOD_TYPE;
      });
    } else {
      filteredRestaurant = data.filter(item => {
        if (search) {
          return item.restaurant_name
            .toLowerCase()
            .startsWith(search.toLowerCase());
        }

        return true;
      });
    }

    return filteredRestaurant;
  };

  handleSearch = e => {
    const {isVeg} = this.state;

    this.setState({search: e}, () => {
      const filteredRestaurants = this.filterRestaurant(null, isVeg, e);

      this.setState({filteredRestaurants});
    });
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
          await this.fetchFavRestaurants(false);

          this.setState({isReferralModal: false, isFiltering: false});
        },
      );
    }
  };

  fetchNextPage = () => {
    const {page, isNextPage} = this.state;

    if (!isNextPage) {
      return;
    }

    const newPage = Number(page) + 1;

    this.setState({page: newPage.toString(), isLoading2: true}, async () => {
      const {
        page,
        cuisine,
        filter,
        orderBy,
        restaurants,
        lastRestaurantId,
      } = this.state;
      const {user} = this.props;

      try {
        const payload = {
          order_by: orderBy,
          user_id: user ? user.id : '0',
          page: page,
          cuisine_id: cuisine,
          filter: filter,
        };

        const response = await api.getMyFavRestroList(payload);
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

  isCloseToBottom = e => {
    const {isLoading2} = this.state;
    const {layoutMeasurement, contentOffset, contentSize} = e.nativeEvent;

    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isBottom && !isLoading2) {
      this.fetchNextPage();
    }
  };

  isOnPageEnd = (_, height) => {
    const {filteredRestaurants, isLoading2} = this.state;

    if (
      !isLoading2 &&
      filteredRestaurants.length &&
      height < constants.WINDOW_HEIGHT - 10
    ) {
      this.fetchNextPage();
      return;
    }

    return false;
  };

  render() {
    const {
      isReferralModal,
      isSearchModal,
      errorMessage,
      isLoading,
      filteredRestaurants,
      current,
      isFiltering,
      isFiltered,
      isNextPage,
      isLoading2,
    } = this.state;

    return (
      <View style={GeneralStyle.flex1}>
        <Header
          onSearchPress={this.handleSearchModalChange.bind(this, true)}
          headerStyles={style.mainHeader}
          onHeartClick={() => {}}
          heartActive={true}
          isIcons={true}>
          Favourite Restaurants
        </Header>
        <ScrollView
          onContentSizeChange={this.isOnPageEnd}
          onScroll={this.isCloseToBottom}
          contentContainerStyle={GeneralStyle.flexGrow1}
          style={[GeneralStyle.flex1, GeneralStyle.backgroundLightGrey]}>
          <View
            style={[
              GeneralStyle.container,
              GeneralStyle.noMarginTop,
              GeneralStyle.flex1,
            ]}>
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
            {!!filteredRestaurants.length ? (
              <View style={GeneralStyle.mediumMarginTop}>
                {filteredRestaurants.map((item, i) => (
                  <CategoryAccordion2
                    key={item.id}
                    containerStyles={style.accordionContainer}
                    duration={500}
                    onPress={() => this.setState({current: item.id})}
                    collapsed={current !== item.id}
                    header={
                      <ItemList
                        data={item}
                        onHeartClick={this.removeFavRestaurant}
                        heartActive={true}
                      />
                    }>
                    <Body data={item} />
                  </CategoryAccordion2>
                ))}
              </View>
            ) : (
              <View style={style.noRestroContainer}>
                <Text style={style.noRestroText}>
                  You Have not marked any favourites yet
                </Text>
              </View>
            )}
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
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavouriteRestaurants);
