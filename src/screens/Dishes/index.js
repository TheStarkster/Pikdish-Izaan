import React, {Component} from 'react';
import {View, Text, ScrollView, Image, TextInput} from 'react-native';
import {connect} from 'react-redux';

import selectedRestaurantActions from '../../redux/selectedRestaurant/action';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import api from '../../config/api';
import Header from '../../components/Header';
import CartSnippet from '../../components/CartSnippet';
import ScreenHeader from './components/Header';
// import ItemList from './components/ItemList';
import ItemList from  "../../components/ItemList"
import RoundInput from '../../components/RoundInput';
import GeneralStyle from '../GeneralStyle';
import style from './style';
import CustomizePopup from '../../components/CustomizePopup';

class Dishes extends Component {
  state = {
    note: '',
    isReferralModal: false,
    items: [],
  };

  componentDidMount() {
    const {selectedCategory} = this.props;

    if (selectedCategory.category_name === 'Recommended') {
      return this.fetchRecommendedItems();
    }

    if (selectedCategory.category_name === 'Happy Hours') {
      return this.fetchHappyHoursItems();
    }

    this.fetchData();
  }

  fetchData = async () => {
    const {
      restaurant,
      selectedCategory,
      selectedDepartment,
      user,
      setSelectedOrderItems,
    } = this.props;

    try {
      this.setState({isLoading: true});

      const payload = {
        restaurant_id: restaurant.id,
        category_id: selectedCategory.id,
        department_id: selectedDepartment,
        order_type: '1',
        is_ac: restaurant.is_ac,
        is_happy: restaurant.is_hh_running ? '1' : '0',
        user_id: user ? user.id : '0',
      };

      const response = await api.appRestroItemsOfCategoryDept(payload);

      setSelectedOrderItems(response.data);
      this.setState({items: response.data});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  fetchRecommendedItems = async () => {
    const {user, restaurant} = this.props;

    try {
      this.setState({isLoading: true});

      const payload = {
        restaurant_id: restaurant.id,
        order_type: '1',
        is_ac: restaurant.is_ac || '0',
        is_happy: restaurant.is_happy_hours || '0',
        user_id: user ? user.id : '0',
      };

      const response = await api.getRecommandedItems(payload);

      this.setState({items: response.data});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  fetchHappyHoursItems = async () => {
    const {user, restaurant} = this.props;

    try {
      this.setState({isLoading: true});

      const payload = {
        restaurant_id: restaurant.id,
        order_type: '1',
        is_ac: restaurant.is_ac || '0',
        is_happy: '2',
        user_id: user ? user.id : '0',
      };

      const response = await api.getHappyHoursItems(payload);

      this.setState({items: response.happy});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  handleTextChange = e => {
    this.setState({note: e.target.value});
  };

  handleReferralModalChange = isReferralModal => {
    this.setState({isReferralModal});
  };

  openModal = () => {
    this.setState({isReferralModal: true});
  };

  render() {
    const {restaurant, selectedTable, selectedCategory, cart} = this.props;
    const {note, isReferralModal, isLoading, errorMessage, items} = this.state;

    return (
      <View style={GeneralStyle.flex1}>
        <Header />
        <ScrollView
          style={[GeneralStyle.flex1]}
          contentContainerStyle={GeneralStyle.flexGrow1}>
          <View style={[GeneralStyle.container, style.container]}>
            <View style={style.content}>
              <RoundInput placeholder="Search for Category or Dishes..." />
              <ScreenHeader
                selectedTable={selectedTable}
                restaurant={restaurant}
              />
              <View style={style.headingContainer}>
                <Text style={style.heading}>
                  {selectedCategory.category_name}
                </Text>
              </View>
              <View style={style.itemContainer}>
                {items.map(item => (
                  <ItemList data={item} restaurant={restaurant} />
                ))}
              </View>
              {/* <View style={style.noteContainer}>
                <Text style={style.note}>Note:</Text>
                <View style={style.feedbackInputContainer}>
                  <TextInput multiline={true} placeholder="Chef Note" />
                </View>
              </View> */}
            </View>
          </View>
        </ScrollView>
        {!!cart.order_items.length && (
          <CartSnippet
            onPress={() =>
              this.props.navigation.navigate(
                'RestaurantBill',
                this.props.navigation.state.params,
              )
            }
          />
        )}
        <CustomizePopup
          onClose={this.handleReferralModalChange}
          visible={isReferralModal}
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
  restaurant: store.auth.restaurant || {},
  selectedTable: store.table.selectedTable,
  selectedDepartment: store.table.selectedDepartment,
  selectedCategory: store.table.selectedCategory,
  user: store.auth.user,
  cart: store.cart.cart,
});

const mapDispatchToProps = {
  setSelectedOrderItems: selectedRestaurantActions.setSelectedOrderItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dishes);
