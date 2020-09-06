import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';

import constants from '../../config/constants';
import colors from '../../config/colors';
import api from '../../config/api';
import ItemCard from './ItemCard';
import CategoryAccordion2 from '../../components/CategoryAccordion2';
import ColoredCircle from '../../components/ColoredCircle';
import RestaurantDetailsHeader from '../../components/RestaurantDetailsHeader';
import CategoryHeader from '../../components/CategoryAccordion2/CategoryHeader';
import ItemList from '../../components/ItemList';
import SuggestedItemModal from '../../components/SuggestedItemModal';
import Switch from '../../components/Switch';
import SearchModal from '../../components/SearchModal';
import CheckoutModal from '../../components/CheckoutModal';
import CartSnippet from '../../components/CartSnippet';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import Header from '../../components/Header';
import GeneralStyle from '../GeneralStyle';
import style from './style';
import CustomizePopup from '../../components/CustomizePopup';
import RestaurantItemsModal from './RestaurantItemsModal';
import selectedRestaurantActions from '../../redux/selectedRestaurant/action';

class RestaurantItems extends Component {
  constructor() {
    super();

    this.onSwitchChange = this.onSwitchChange.bind(this);
    this.handleReferralModalChange = this.handleReferralModalChange.bind(this);
    this.handleReferralModalChange2 = this.handleReferralModalChange2.bind(
      this,
    );
    this.measureLayout = this.measureLayout.bind(this);
    this.handleScrolling = this.handleScrolling.bind(this);
    this.handleSearchModalChange = this.handleSearchModalChange.bind(this);
    this.handleItemCardPress = this.handleItemCardPress.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleCheckoutModalChange = this.handleCheckoutModalChange.bind(this);
    this.handleSuggestedModalChange = this.handleSuggestedModalChange.bind(
      this,
    );
    this.openCustomizeModal = this.openCustomizeModal.bind(this);
  }

  state = {
    isSwitch: false,
    isIcons: true,
    isReferralModal: false,
    isReferralModal2: false,
    isSuggestedModal: false,
    isSearchModal: false,
    pizza: '',
    recommeded: '',
    bhel: '',
    sandwitches: '',
    selectedModalItem: '',
    categoryCollapsed: '',
    itemCollapsed: '',
    isCheckoutModal: false,
    categories: [],
    happyItems: [],
    recommededItems: [],
    // isCollapsed: true,
  };

  componentDidMount() {
    this.fetchData();
    this.fetchRecommendedItems();

    if (this.isItemDiscount()) {
      this.fetchHappyHoursItems();
    }

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }

  isItemDiscount = () => {
    const {restaurant} = this.props;

    return (
      restaurant.is_happy_hours === constants.ITEM_DISCOUNT_CODE &&
      restaurant.is_hh_running.happy_hour === constants.ITEM_DISCOUNT_TEXT
    );
  };

  fetchHappyHoursItems = async () => {
    const {user, restaurant, orderType} = this.props;

    try {
      this.setState({isLoading: true});

      const payload = {
        restaurant_id: restaurant.restaurant_id,
        order_type: orderType,
        is_ac: restaurant.is_ac || '0',
        is_happy: '2',
        user_id: user ? user.id : '0',
      };

      const response = await api.getHappyHoursItems(payload);

      this.setState({happyItems: response.happy});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  fetchRecommendedItems = async () => {
    const {user, restaurant, orderType} = this.props;

    try {
      this.setState({isLoading: true});

      const payload = {
        restaurant_id: restaurant.restaurant_id,
        order_type: orderType,
        is_ac: restaurant.is_ac || '0',
        is_happy: restaurant.is_happy_hours || '0',
        user_id: user ? user.id : '0',
      };

      const response = await api.getRecommandedItems(payload);

      this.setState({recommededItems: response.data});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  fetchData = async () => {
    const {user, restaurant, orderType, setSelectedOrderItems} = this.props;

    try {
      this.setState({isLoading: true});

      const payload = {
        restaurant_id: restaurant.restaurant_id,
        department_id: restaurant.dept_id,
        order_type: orderType,
        user_id: user ? user.id : '0',
      };

      const response = await api.appRestroCategory(payload);

      const categories = await this.fetchItems(response.data);

      setSelectedOrderItems(categories);

      this.setState({categories, filteredCategories: categories});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  fetchItems = async categories => {
    const {orderType, user, restaurant} = this.props;
    let is_ac = '0';

    try {
      if (
        orderType === constants.PRE_ORDER_TYPE ||
        orderType === constants.TABLE_ORDER_TYPE
      ) {
        if (restaurant.departments) {
          const depart = restaurant.departments.find(
            item => item.id === restaurant.dept_id,
          );

          is_ac = depart ? depart.is_ac : '0';
        }
      }

      const promises = categories.map(async item => {
        try {
          const payload = {
            restaurant_id: item.restaurant_id,
            category_id: item.id,
            department_id: item.dept_id || '0',
            order_type: orderType,
            is_ac: is_ac,
            is_happy: restaurant.is_hh_running ? '1' : '0',
            user_id: user ? user.id : '0',
          };

          const response = await api.appRestroItemsOfCategoryDept(payload);
          return {...response, category: item.id};
        } catch (e) {
          throw e;
        }
      });

      const responses = await Promise.all(promises);

      const updatedCategories = categories.map(cat => {
        const item = responses.find(resp => resp.category === cat.id) || {};

        return {...cat, item: item.data};
      });

      return updatedCategories;
    } catch (e) {
      throw e;
    }
  };

  navigate(route) {
    this.props.navigation.navigate(route);
  }

  handleScrolling(element, isAccordionClicked) {
    const el = element.toLowerCase();

    // if (isAccordionClicked) {
    //   return setTimeout(() => {
    //     this.scrollView.scrollTo({y: this.state[el] - 100});
    //   }, 100);
    // }

    this.setState({selectedModalItem: el, categoryCollapsed: el}, () => {
      setTimeout(() => {
        this.scrollView.scrollTo({y: this.state[el] - 100});
      }, 1000);
    });
  }

  handleReferralModalChange(isReferralModal) {
    this.setState({isReferralModal});
  }

  handleSuggestedModalChange(isSuggestedModal) {
    this.setState({isSuggestedModal});
  }

  handleSearchModalChange(isSearchModal) {
    this.setState({isSearchModal});
  }

  handleReferralModalChange2(isReferralModal2) {
    this.setState({isReferralModal2});
  }

  handleCheckoutModalChange(isCheckoutModal) {
    this.setState({isCheckoutModal});
  }

  onSwitchChange(isSwitch) {
    const {categories} = this.state;
    let filteredCategories = categories;

    if (isSwitch) {
      filteredCategories = categories.map(cat => {
        const items = cat.item.filter(item => item.is_veg === '1');
        return {...cat, item: items};
      });
    }

    this.setState({isSwitch, filteredCategories});
  }

  openModal(key) {
    this.setState({[key]: true});
  }

  measureLayout(text, e) {
    this[text].measureInWindow((x, y, width, height) => {
      this.setState({[text]: y});
    });
  }

  handleItemCardPress(amount) {
    if (!amount) return alert('Please select Item');

    this.openModal('isReferralModal');
  }

  handleCategoryHeaderPress(nextCategory) {
    // alert('asd');
    const {categoryCollapsed} = this.state;

    if (categoryCollapsed.toLowerCase() === nextCategory.toLowerCase()) {
      return this.setState({categoryCollapsed: ''});
    }

    this.setState({categoryCollapsed: nextCategory.toLowerCase()});
    this.handleScrolling(nextCategory);
  }

  handleItemHeaderPress(nextItem) {
    const {itemCollapsed} = this.state;

    if (itemCollapsed.toLowerCase() === nextItem.toLowerCase()) {
      return this.setState({itemCollapsed: ''});
    }

    this.setState({itemCollapsed: nextItem.toLowerCase()});
  }

  openCustomizeModal() {
    this.setState({isReferralModal: true});
  }

  renderAccordion() {
    const {
      categoryCollapsed,
      itemCollapsed,
      filteredCategories: categories,
    } = this.state;
    const {restaurant} = this.props;
    let content;

    return categories.map((item, index) => {
      let categoryHeader = (
        <CategoryHeader
          title={item.category_name}
          onPress={this.handleCategoryHeaderPress.bind(
            this,
            item.category_name,
          )}
        />
      );

      // if (item.subcategory.length) {
      //   content = item.itemsCategory.map(item => (
      //     <CategoryAccordion2
      //       key={Math.random().toString()}
      //       collapsed={itemCollapsed !== item.itemTitle.toLowerCase()}
      //       header={
      //         <ItemHeader
      //           title={item.itemTitle}
      //           amount={item.amount}
      //           onPress={this.handleItemHeaderPress.bind(this, item.itemTitle)}
      //         />
      //       }>
      //       <ItemList />
      //     </CategoryAccordion2>
      //   ));
      // }

      if (!item.subcategory.length) {
        if (item.is_show_item_img === '1') {
          content = (
            <View
              style={[
                GeneralStyle.flexRow,
                GeneralStyle.justifyBetween,
                GeneralStyle.flexWrap,
              ]}>
              {item.item.map((item, i) => (
                <ItemCard
                  key={i}
                  data={item}
                  onShowSuggestion={this.handleSuggestedModalChange}
                  onPress={this.handleItemCardPress}
                />
              ))}
            </View>
          );
        } else {
          content = (
            <View>
              {item.item.map((i, index) => (
                <ItemList key={index} data={i} />
              ))}
            </View>
          );
        }
      }

      return (
        <View
          key={index}
          ref={el => (this[item.category_name.toLowerCase()] = el)}
          onLayout={this.measureLayout.bind(
            this,
            item.category_name.toLowerCase(),
          )}>
          <CategoryAccordion2
            header={categoryHeader}
            collapsed={categoryCollapsed !== item.category_name.toLowerCase()}>
            {content}
          </CategoryAccordion2>
        </View>
      );
    });
  }

  isFlatDiscount = () => {
    const {restaurant} = this.props;

    return (
      restaurant.is_happy_hours === constants.FLAT_DISCOUNT_CODE &&
      restaurant.is_hh_running.happy_hour === constants.FLAT_DISCOUNT_TEXT
    );
  };

  renderHappyItems = () => {
    if (!this.isItemDiscount()) return null;

    const {happyItems} = this.state;

    return (
      <View onLayout={this.measureLayout.bind(this, 'happy hours')}>
        <Text
          ref={el => (this['happy hours'] = el)}
          style={style.categoryHeading}>
          Happy Hours
        </Text>
        <View
          style={[
            GeneralStyle.flexRow,
            GeneralStyle.justifyBetween,
            GeneralStyle.flexWrap,
          ]}>
          {happyItems.map((item, i) => (
            <ItemCard
              isHappy={true}
              key={i}
              data={item}
              onShowSuggestion={this.handleSuggestedModalChange}
              onPress={this.handleItemCardPress}
            />
          ))}
        </View>
      </View>
    );
  };

  renderRecommended = () => {
    const {recommededItems} = this.state;

    if (!recommededItems.length) return;

    return (
      <View onLayout={this.measureLayout.bind(this, 'recommended')}>
        <Text ref={el => (this.recommended = el)} style={style.categoryHeading}>
          Recommended
        </Text>
        <View
          style={[
            GeneralStyle.flexRow,
            GeneralStyle.justifyBetween,
            GeneralStyle.flexWrap,
          ]}>
          {recommededItems.map((item, i) => (
            <ItemCard
              key={i}
              data={item}
              isHappy={false}
              image={{
                uri:
                  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2017/5/10/0/FNM_060117-Smashburger-Style-Burgers-Recipe_s4x3.jpg.rend.hgtvcom.826.620.suffix/1494459418304.jpeg',
              }}
              onPress={this.handleItemCardPress}
            />
          ))}
        </View>
      </View>
    );
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
        user_id: user ? user.id : '0',
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
        user_id: user ? user.id : '0',
        restaurant_id: restaurant.restaurant_id,
      };

      await api.removeRestaurantFromFavList(payload);
      setSelectedRestaurant({...restaurant, my_fav: '0'});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  handleBackPress = () => {
    const {navigation} = this.props;

    if (
      navigation.state &&
      navigation.state.params &&
      navigation.state.params.fromWelcome
    ) {
      navigation.navigate('Home');
    } else {
      navigation.goBack(null);
    }

    return true;
  };

  renderColoredCircle = () => {
    const {restaurant} = this.props;
    const elements = [];

    if (restaurant.food_type === constants.BOTH_FOOD_TYPE) {
      elements.push(<ColoredCircle style={{marginHorizontal: 5}} />);
      elements.push(
        <ColoredCircle style={{marginHorizontal: 5}} color="red" />,
      );
    }

    if (restaurant.food_type === constants.VEG_FOOD_TYPE) {
      elements.push(<ColoredCircle style={{marginHorizontal: 5}} />);
    }

    if (restaurant.food_type === constants.NON_VEG_FOOD_TYPE) {
      elements.push(
        <ColoredCircle style={{marginHorizontal: 5}} color="red" />,
      );
    }

    return elements;
  };

  getCuisine = () => {
    const {restaurant} = this.props;

    const c = restaurant.cuisine || [];

    const cuisine = c.map(item => item.cuisine_name).join(', ');

    return cuisine;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const {
      isSwitch,
      hasSearchBar,
      isReferralModal,
      isReferralModal2,
      isSuggestedModal,
      isIcons,
      isSearchModal,
      selectedModalItem,
      isCheckoutModal,
      isLoading,
      errorMessage,
      categories,
      recommededItems,
      happyItems,
      // isCollapsed,
    } = this.state;
    const {restaurant, theme, cart} = this.props;

    return (
      <View style={GeneralStyle.flex1}>
        <Header
          onBackPress={this.handleBackPress}
          hasSearchBar={hasSearchBar}
          onHeartClick={this.handleHeartClick}
          heartActive={restaurant.my_fav === '1'}
          onSearchPress={() => this.setState({isSearchModal: true})}
          isIcons={isIcons}
        />
        <ScrollView
          contentContainerStyle={GeneralStyle.flexGrow1}
          ref={el => (this.scrollView = el)}>
          <View style={[GeneralStyle.backgroundLightGrey, GeneralStyle.flex1]}>
            <View style={[GeneralStyle.container, GeneralStyle.noMarginTop]}>
              <RestaurantDetailsHeader restaurant={restaurant} />
              <View
                style={[
                  GeneralStyle.flexRow,
                  GeneralStyle.smallMarginTop,
                  GeneralStyle.alignCenter,
                ]}>
                {restaurant.food_type === constants.VEG_FOOD_TYPE ? (
                  <View
                    style={[
                      GeneralStyle.flex1,
                      GeneralStyle.flexRow,
                      GeneralStyle.alignCenter,
                    ]}>
                    <View style={[GeneralStyle.smallMarginLeft]}>
                      <Image
                        style={style.pureVeg}
                        source={require('../../assets/icon/pure-veg.png')}
                      />
                    </View>
                    <Text style={[style.veg, {color: colors.VEG}]}>
                      Pure Veg
                    </Text>
                  </View>
                ) : (
                  <View
                    style={[
                      GeneralStyle.flex1,
                      GeneralStyle.flexRow,
                      GeneralStyle.alignCenter,
                    ]}>
                    <Text style={style.veg}>VEG</Text>
                    <View style={GeneralStyle.smallMarginLeft}>
                      <Switch
                        value={isSwitch}
                        onValueChange={this.onSwitchChange}
                      />
                    </View>
                  </View>
                )}
                {this.isFlatDiscount() && (
                  <Image
                    resizeMode="contain"
                    style={style.hhIcon}
                    source={require('../../assets/icon/hh.png')}
                  />
                )}
              </View>
              <View>
                {this.renderHappyItems()}
                {this.renderRecommended()}
                <View>{!!categories.length && this.renderAccordion()}</View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={[
            style.menuContainer,
            !cart.order_items.length && {bottom: 20},
          ]}>
          <TouchableOpacity onPress={() => this.openModal('isReferralModal2')}>
            {/* <Text>Menu</Text> */}
            <Image
              resizeMode="cover"
              style={style.menuIcon}
              source={require('../../assets/icon/menu.png')}
            />
          </TouchableOpacity>
        </View>
        {!!cart.order_items.length && (
          <CartSnippet
            onPress={() =>
              this.props.navigation.navigate(
                'ViewCart',
                this.props.navigation.state.params,
              )
            }
          />
        )}
        <CustomizePopup
          onClose={this.handleReferralModalChange}
          visible={isReferralModal}
        />
        <RestaurantItemsModal
          recommededItems={recommededItems}
          happyItems={happyItems}
          selected={selectedModalItem}
          categories={categories}
          onPress={this.handleScrolling}
          onClose={this.handleReferralModalChange2}
          visible={isReferralModal2}
        />
        <SuggestedItemModal
          onClose={this.handleSuggestedModalChange}
          visible={isSuggestedModal}
          onCustomizePress={this.openCustomizeModal}
        />
        <SearchModal
          onClose={this.handleSearchModalChange}
          visible={isSearchModal}
        />
        <CheckoutModal
          visible={isCheckoutModal}
          onClose={this.handleCheckoutModalChange}
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
  restaurant: store.selectedRestaurant.restaurant,
  theme: store.theme.appTheme,
  orderType: store.selectedRestaurant.orderType,
  user: store.auth.user,
  cart: store.cart.cart,
});

const mapDispatchToProps = {
  setSelectedRestaurant: selectedRestaurantActions.setSelectedRestaurant,
  setSelectedOrderItems: selectedRestaurantActions.setSelectedOrderItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantItems);
