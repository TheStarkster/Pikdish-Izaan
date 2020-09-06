import React, {Component} from 'react';
import {View, ScrollView, StatusBar, BackHandler} from 'react-native';
import {connect} from 'react-redux';

import constants from '../../config/constants';

import tableActions from '../../redux/table/action';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import api from '../../config/api';
import SearchModal from '../../components/SearchModal';
import Header from '../../components/Header';
import ScreenHeader from './Header';
import Item from './Item';
import GeneralStyle from '../GeneralStyle';
import style from './style';

class BookTable extends Component {
  state = {
    isSearchModal: false,
    categories: [],
  };

  componentDidMount() {
    this.fetchData();

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBack,
    );
  }

  fetchData = async () => {
    const {restaurant, user, selectedDepartment} = this.props;

    try {
      this.setState({isLoading: true});

      const payload = {
        restaurant_id: restaurant.id,
        department_id: selectedDepartment,
        order_type: '1',
        user_id: user ? user.id : '0',
      };

      const response = await api.appRestroCategory(payload);

      this.setState({categories: response.data});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  handleBack = () => {
    // this.props.navigation.dispatch(helpers.getStackReseter('Main', {}));
    this.props.navigation.goBack(null);
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleSearchModalChange = isSearchModal => {
    this.setState({isSearchModal});
  };

  handleSearch = e => {};

  onCategoryPress = async data => {
    this.props.setSelectedCategory(data);
    this.props.navigation.navigate('Dishes');
  };

  renderCategory = () => {
    let {categories} = this.state;
    const elements = [];

    if (categories.length) {
      categories = [...categories, ...constants.CATEGORIES];
    }

    for (let i = 0; i < categories.length; i++) {
      if (i % 2 === 0) {
        elements.push(
          <View style={style.categoryContainer}>
            <Item
              onPress={this.onCategoryPress}
              data={categories[i]}
              category="Category"
            />
            {categories[i + 1] ? (
              <Item
                onPress={this.onCategoryPress}
                data={categories[i + 1]}
                category="Pizza"
                containerStyles={style.item}
              />
            ) : (
              <View style={GeneralStyle.flex1} />
            )}
          </View>,
        );
      }

      if (i % 2 !== 0 && categories.length - 1 === i) {
        elements.push(
          <View style={style.categoryContainer}>
            <Item
              onPress={this.onCategoryPress}
              data={categories[i]}
              category="Category"
            />
          </View>,
        );
      }
    }

    return elements;
  };

  render() {
    const {restaurant, selectedTable} = this.props;
    const {isSearchModal, isLoading, errorMessage} = this.state;

    return (
      <View style={GeneralStyle.flex1}>
        <StatusBar
          networkActivityIndicatorVisible={true}
          backgroundColor="white"
          barStyle="dark-content"
          translucent={false}
        />
        <Header
          showHeart={false}
          onSearchPress={this.handleSearchModalChange.bind(this, true)}
          isIcons={true}
          onBackPress={this.handleBack}
        />
        <ScrollView
          style={[GeneralStyle.flex1]}
          contentContainerStyle={GeneralStyle.flexGrow1}>
          <View style={[GeneralStyle.container, style.container]}>
            <View style={style.content}>
              {/* <RoundInput placeholder="Search for Category or Dishes..." /> */}
              <ScreenHeader
                selectedTable={selectedTable}
                restaurant={restaurant}
              />
              {this.renderCategory()}
              {/* <View style={style.categoryContainer}>
                <Item category="Category" />
                <Item category="Pizza" containerStyles={style.item} />
                <Item category="Chinese" />
                <Item category="South Indian" containerStyles={style.item} />
                <Item category="Mexican" />
                <Item category="North Indian" containerStyles={style.item} />
              </View> */}
            </View>
          </View>
        </ScrollView>
        <SearchModal
          placeholder="Search for Category or Dishes..."
          value={this.state.search}
          onChangeText={this.handleSearch}
          onClose={this.handleSearchModalChange}
          visible={isSearchModal}
        />
        {isLoading && <Loader />}
        <ErrorBox message={errorMessage} />
      </View>
    );
  }
}

const mapStateToProps = store => ({
  restaurant: store.auth.restaurant || {},
  selectedTable: store.table.selectedTable,
  selectedDepartment: store.table.selectedDepartment,
});

const mapDispatchToProps = {
  setSelectedCategory: tableActions.setSelectedCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookTable);
