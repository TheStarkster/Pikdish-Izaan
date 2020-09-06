import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

import ErrorBox from '../../components/ErrorBox';
import api from '../../config/api';
import Loader from '../../components/Loader';
import selectedRestaurantActions from '../../redux/selectedRestaurant/action';
import GeneralStyle from '../../screens/GeneralStyle';
import constants from '../../config/constants';
import colors from '../../config/colors';

const Item = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handlePress() {
    if (props.type === 'cuisine') {
      return props.navigation.navigate('RestaurantListingCuisines', {
        type: 'cuisine',
        cuisine: props.data,
      });
    }

    try {
      setIsLoading(true);

      const payload = {
        restaurant_id: props.data.id,
        order_type: props.orderType,
        user_id: props.user ? props.user.id : '0',
        cuisine_id: '',
      };

      const response = await api.appRestroDataByID(payload);

      setIsLoading(false);
      const restaurant = response.restro[0] || {};

      let departId = '0';

      if (Array.isArray(restaurant.departments)) {
        if (restaurant.departments[0]) {
          departId = restaurant.departments[0].id;
        }
      }

      if (
        Array.isArray(restaurant.departments) &&
        restaurant.departments.length > 1
      ) {
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
      setErrorMessage(e.message);
      setIsLoading(false);
    }
  }

  function getName() {
    if (props.type === 'cuisine') {
      return props.data.cuisine_name;
    }

    return props.data.restaurant_name;
  }

  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <View style={[style.container, props.containerStyle]}>
          <View style={style.imageContainer}>
            <Image
              // resizeMode="contain"
              style={style.image}
              source={{
                uri: constants.RESTAURANT_LOGO_PATH + props.data.logo_pic,
              }}
            />
          </View>
          <View style={style.details}>
            <Text style={style.name}>{getName()}</Text>
            {props.orderType === constants.DELIVERY_TYPE && (
              <Text style={style.time}>{props.data.delivery_time}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
      {isLoading && <Loader />}
      <ErrorBox onClose={() => setErrorMessage('')} message={errorMessage} />
    </>
  );
};

const mapStateToProps = store => ({
  restaurant: store.selectedRestaurant.restaurant,
  orderType: store.selectedRestaurant.orderType,
  user: store.auth.user,
});

const mapDispatchToProps = {
  setSelectedRestaurant: selectedRestaurantActions.setSelectedRestaurant,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Item));

const style = StyleSheet.create({
  container: {
    width: constants.WINDOW_WIDTH * 0.2,
    // height: constants.WINDOW_HEIGHT * 0.19,
    backgroundColor: 'white',
    alignItems: 'center',
    // justifyContent: 'center',
    marginHorizontal: constants.MARGIN_SMALL,
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.5,
  },
  imageContainer: {
    width: constants.WINDOW_WIDTH * 0.2,
    height: constants.WINDOW_WIDTH * 0.2,
    borderRadius: (constants.WINDOW_WIDTH * 0.2) / 2,
    borderColor: colors.GREY,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: constants.MARGIN_VERTICAL_XSMALL * 0.3
    // backgroundColor: "rgba(0,0,0,0.5)"
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: constants.WINDOW_WIDTH * 0.2,
  },
  details: {
    paddingHorizontal: constants.PADDING_X_SMALL,
    // flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
    fontSize: constants.FONT_SMALL * 0.7,
  },
  time: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL * 0.9,
    textAlign: 'center',
    color: colors.GREY,
  },
});
