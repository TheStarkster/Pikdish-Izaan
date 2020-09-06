import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

import api from '../../../../config/api';
import Loader from '../../../../components/Loader';
import ErrorBox from '../../../../components/ErrorBox';
import selectedRestaurantActions from '../../../../redux/selectedRestaurant/action';
import ColoredCircle from '../../../../components/ColoredCircle';
import CircleHeart from '../../../../components/CircleHeart';
import style from './style';
import GeneralStyle from '../../../GeneralStyle';
import constants from '../../../../config/constants';

const ItemList = props => {
  const [fav, setFav] = useState(props.data.my_fav === '1');
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // function handlePress() {
  //   if (props.onPress) return props.onPress();

  //   const departments = props.data.departments;

  //   let departId = Array.isArray(departments)
  //     ? props.data.departments[0].id
  //     : '0';

  //   if (Array.isArray(departments) && departments.length > 1) {
  //     return props.navigation.navigate('SelectDepartment', {
  //       restaurant: props.data,
  //     });
  //   }

  //   props.setSelectedRestaurant({
  //     ...props.data,
  //     restaurant_id: props.data.id,
  //     dept_id: departId,
  //   });

  //   if (props.data.restaurant_type === constants.FOOD_COURT_TYPE) {
  //     props.navigation.navigate('FoodCourt');
  //   } else {
  //     props.navigation.navigate('RestaurantItems');
  //   }
  // }

  function handleFavChange() {
    if (props.onHeartClick) {
      return props.onHeartClick(props.data.id);
    }

    if (fav) {
      removeFav();
    } else {
      addFav();
    }
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

  function isPremium() {
    return props.data.premium_tag === '1';
  }

  return (
    <>
      <View>
        <View style={style.container}>
          {!!isPremium() && (
            <Text
              style={[
                style.premiumContainer,
                {backgroundColor: props.theme.theme_colour},
              ]}>
              Premium
            </Text>
          )}
          <View>
            <Image
              resizeMode="contain"
              style={style.image}
              source={{
                uri: constants.RESTAURANT_LOGO_PATH + props.data.logo_pic,
              }}
            />
          </View>
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
                    source={require('../../../../assets/icon/star.png')}
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
                  // resizeMode="contain"
                  style={style.hhIcon}
                  source={require('../../../../assets/icon/hh.png')}
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
      </View>
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
};

const mapStateToProps = store => ({
  orderType: store.selectedRestaurant.orderType,
  theme: store.theme.appTheme,
  user: store.auth.user,
});

const mapDispatchToProps = {
  setSelectedRestaurant: selectedRestaurantActions.setSelectedRestaurant,
};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ItemList),
);
