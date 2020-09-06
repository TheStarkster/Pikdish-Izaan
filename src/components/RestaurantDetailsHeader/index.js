import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

import restaurantActions from '../../redux/restaurant/action';
import helpers from '../../config/helpers';
import ColoredCircle from '../ColoredCircle';
import constants from '../../config/constants';
import GeneralStyle from '../../screens/GeneralStyle';
import style from './style';

function Header(props) {
  function renderColoredCircle() {
    const {restaurant} = props;
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
  }

  function handlePress() {
    props.setRestaurant(props.restaurant);

    props.navigation.navigate('RestaurantDetail');
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[style.restaurantDetails, props.containerStyles]}>
        <View style={style.restaurantImageContainer}>
          <Image
            // resizeMode="contain"
            style={style.restaurantImage}
            source={{
              uri: constants.RESTAURANT_LOGO_PATH + props.restaurant.logo_pic,
            }}
          />
        </View>
        <View style={style.restaurantImageAfter}>
          <Text style={style.restaurantName}>
            {props.restaurant.restaurant_name}
          </Text>
          {!!helpers.getCuisine(props.restaurant) && (
            <Text style={style.cuisine}>
              {helpers.getCuisine(props.restaurant)}
            </Text>
          )}
          <View style={style.line}></View>
          <View
            style={[
              GeneralStyle.smallMarginTop,
              GeneralStyle.flexRow,
              GeneralStyle.alignCenter,
            ]}>
            <Image
              style={style.star}
              source={require('../../assets/icon/star.png')}
            />
            <Text style={style.rating}>{props.restaurant.rating}</Text>
            <Image
              style={style.dot}
              source={require('../../assets/icon/dot.png')}
            />
            <Text style={style.time}>
              {props.restaurant.preparation_time} mins
            </Text>
            <Image
              style={style.dot}
              source={require('../../assets/icon/dot.png')}
            />
            {renderColoredCircle()}
          </View>
          <View>
            <Text style={style.discountLabel}>
              {props.restaurant.discount_label}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setRestaurant: restaurantActions.setRestaurant,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Header));
