import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import api from '../../config/api';
import Restaurants from './Restaurants';
import Dishes from './Dishes';
import style from './style';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import SearchModal from '../../components/SearchModal';
import GeneralStyle from '../GeneralStyle';

class SearchItems extends Component {
  constructor() {
    super();

    this.handleSearchModalChange = this.handleSearchModalChange.bind(this);
  }

  state = {
    active: 'restaurants',
    isSearchModal: true,
    searchTerms: '',
    restro: [],
    dish: [],
    search: '',
  };

  fetchData = async () => {
    try {
      if (!this.state.search) return;

      const payload = {
        search_text: this.state.search,
        restaurant_id: this.props.theme.restaurant_id,
      };

      const response = await api.getAppRestroDishSearch(payload);

      console.log('response =>', response);
      this.setState(
        { dish: response.data.dish, restro: response.data.restro },
        () => {
          if (!this.state.restro.length && this.state.dish.length) {
            this.setState({ active: 'dishes' });
          }
        },
      );
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
  };

  navigate(route) {
    this.props.navigation.navigate(route);
  }

  handleSearchModalChange(isSearchModal) {
    this.setState({ isSearchModal });
  }

  handleChange = value => {
    this.setState({ search: value }, () => {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => this.fetchData(), 500);
    });
  };

  render() {
    const {
      active,
      isSearchModal,
      searchTerms,
      isLoading,
      errorMessage,
      restro,
      dish,
    } = this.state;

    return (
      <View style={GeneralStyle.flex1}>
        <Header
          showHeart={false}
          onSearchPress={this.handleSearchModalChange.bind(this, true)}
          isIcons={true}>
          Search
          </Header>
        <ScrollView>
          <View style={[GeneralStyle.container, GeneralStyle.noMarginTop]}>
            <View style={style.tabContainer}>
              <View
                style={[style.tab, active === 'restaurants' && style.active]}>
                <TouchableOpacity
                  onPress={() => this.setState({ active: 'restaurants' })}>
                  <Text style={[style.tabText]}>Restaurants</Text>
                </TouchableOpacity>
              </View>
              <View style={[style.tab, active === 'dishes' && style.active]}>
                <TouchableOpacity
                  onPress={() => this.setState({ active: 'dishes' })}>
                  <Text style={[style.tabText, GeneralStyle.textRight]}>
                    Dishes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {active === 'restaurants' &&
              this.props.theme.restaurant_id === '0' ? (
                <Restaurants data={restro} searchTerms={searchTerms} />
              ) : (
                <Dishes data={dish} searchTerms={searchTerms} />
              )}
          </View>
        </ScrollView>
        <SearchModal
          onChangeText={this.handleChange}
          visible={isSearchModal}
          onClose={this.handleSearchModalChange}
        />
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
  theme: store.theme.appTheme,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchItems);
