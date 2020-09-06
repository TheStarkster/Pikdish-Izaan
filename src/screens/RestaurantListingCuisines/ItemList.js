import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

import api from '../../config/api';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import selectedRestaurantActions from '../../redux/selectedRestaurant/action';
import ColoredCircle from '../../components/ColoredCircle';
import CircleHeart from '../../components/CircleHeart';
import style from './ItemListStyle';
import GeneralStyle from '../GeneralStyle';
import constants from '../../config/constants';

const ItemList = props => {
  const [fav, setFav] = useState(props.data.my_fav === '1');
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handlePress() {
    if (props.onPress) return props.onPress();

    try {
      const payload = {
        restaurant_id: props.data.id,
        order_type: props.orderType,
        user_id: props.user ? props.user.id : '0',
        cuisine_id: '',
      };

      setLoading(true);

      const response = await api.appRestroDataByID(payload);
      setLoading(false);

      const restaurant = response.restro[0] || {};

      const departments = restaurant.departments;

      let departId = Array.isArray(departments)
        ? restaurant.departments[0].id
        : '0';

      if (Array.isArray(departments) && departments.length > 1) {
        return props.navigation.navigate('SelectDepartment', {
          restaurant,
        });
      }

      props.setSelectedRestaurant({
        ...restaurant,
        restaurant_id: restaurant.id,
        dept_id: departId,
      });

      if (restaurant.restaurant_type === constants.FOOD_COURT_TYPE) {
        props.navigation.navigate('FoodCourt');
      } else {
        props.navigation.navigate('RestaurantItems');
      }
    } catch (e) {
      setLoading(false);
      setErrorMessage(e.message);
    }
  }

  async function handleFavChange() {
    const localFav = fav;

    if (fav) {
      await removeFav();
    } else {
      await addFav();
    }

    props.onFavChange(!localFav, props.data);
  }

  async function addFav() {
    try {
      setLoading(true);

      const payload = {user_id: props.user.id, restaurant_id: props.data.id};

      await api.addRestaurantInFavList(payload);

      setFav(!fav);
    } catch (e) {
      setErrorMessage(e.message);
    }

    setLoading(false);
    return 'success';
  }

  async function removeFav() {
    try {
      setLoading(true);

      const payload = {user_id: props.user.id, restaurant_id: props.data.id};

      await api.removeRestaurantFromFavList(payload);

      setFav(!fav);
    } catch (e) {
      setErrorMessage(e.message);
    }

    setLoading(false);
    return 'success';
  }

  function renderCuisine() {
    if (!props.data.cuisine) return null;

    const cuisine = props.data.cuisine
      .map(item => item.cuisine_name)
      .join(', ');

    if (!cuisine) return null;

    return <Text style={style.type}>{cuisine}</Text>;
  }

  function shouldShowRating() {
    return props.data.rating !== '0' && props.data.preparation_time !== '0';
  }

  function isHappyHours() {
    const hh = props.data.is_hh_running || {};

    return (
      hh.happy_hour === constants.ITEM_DISCOUNT_TEXT ||
      hh.happy_hour === constants.FLAT_DISCOUNT_TEXT
    );
  }

  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <View style={style.container}>
          <Image
            // resizeMode="contain"
            style={style.image}
            source={{
              uri: constants.RESTAURANT_LOGO_PATH + props.data.logo_pic,
            }}
          />
          <View style={style.details}>
            <View style={style.restaurantNameContainer}>
              <ColoredCircle
                color={
                  props.data.food_type === constants.VEG_FOOD_TYPE
                    ? 'green'
                    : 'red'
                }
                style={style.box}
              />
              <Text style={style.restaurantName}>
                {props.data.restaurant_name}
              </Text>
            </View>
            <View style={style.restaurantDetailsContainer}>
              {renderCuisine()}
              {shouldShowRating() && (
                <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
                  <Image
                    source={require('../../assets/icon/star.png')}
                    style={style.star}
                    resizeMode="cover"
                  />
                  <Text style={style.rating}>{props.data.rating}</Text>
                  <Text style={style.rating}>|</Text>
                  <Text style={style.rating}>
                    {props.data.preparation_time} mins
                  </Text>
                </View>
              )}
              <View>
                <Text style={style.discount}>{props.data.discount_label}</Text>
              </View>
            </View>
          </View>
          <View style={style.rightContainer}>
            <View style={style.discountContainer}>
              {isHappyHours() ? (
                <Image
                  resizeMode="contain"
                  style={style.hhIcon}
                  source={require('../../assets/icon/hh.png')}
                />
              ) : null}
            </View>
            <CircleHeart
              onPress={handleFavChange}
              active={fav}
              containerStyles={style.heartContainer}
            />
          </View>
        </View>
      </TouchableOpacity>
      {isLoading && <Loader />}
      <ErrorBox message={errorMessage} onClose={() => setErrorMessage('')} />
    </>
  );
};

ItemList.defaultProps = {
  data: {
    restaurant_name: 'Jodhpur Dabbawala',
    rating: 4.4,
    distance: 30,
    food_type: '0',
    is_hh_running: '',
  },
  onFavChange: function() {},
};

const mapStateToProps = store => ({
  orderType: store.selectedRestaurant.orderType,
  user: store.auth.user,
});

const mapDispatchToProps = {
  setSelectedRestaurant: selectedRestaurantActions.setSelectedRestaurant,
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(ItemList),
);
