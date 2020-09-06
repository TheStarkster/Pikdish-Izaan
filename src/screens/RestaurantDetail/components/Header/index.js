import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import constants from '../../../../config/constants';
import ColoredCircle from '../../../../components/ColoredCircle';
import helpers from '../../../../config/helpers';
import GeneralStyle from '../../../GeneralStyle';
import style from './style';

function Header(props) {
  function renderColoredCircle() {
    const {restaurant} = props;
    const elements = [];

    if (restaurant.food_type === constants.BOTH_FOOD_TYPE) {
      elements.push(
        <ColoredCircle style={[{marginHorizontal: 5}, style.colorBox]} />,
      );
      elements.push(
        <ColoredCircle
          style={[{marginHorizontal: 5}, style.colorBox]}
          color="red"
        />,
      );
    }

    if (restaurant.food_type === constants.VEG_FOOD_TYPE) {
      elements.push(
        <ColoredCircle style={[{marginHorizontal: 5}, style.colorBox]} />,
      );
    }

    if (restaurant.food_type === constants.NON_VEG_FOOD_TYPE) {
      elements.push(
        <ColoredCircle
          style={[{marginHorizontal: 5}, style.colorBox]}
          color="red"
        />,
      );
    }

    return elements;
  }

  return (
    <View style={[style.header, props.containerStyle]}>
      <View style={style.headerLeft}>
        <Text style={style.headerRestaurantName}>
          {props.restaurant.restaurant_name}
        </Text>
        {/* <Text style={style.headerAddress}>Ratanada Jodupur</Text> */}
        <View style={style.restaurantDetailContainer}>
          <Text style={style.headerPrice}>
            {helpers.getCuisine(props.restaurant)}
          </Text>
          <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
            {renderColoredCircle()}
          </View>
        </View>
      </View>
      <View style={style.headerRight}>
        <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
          <Icon
            name="star"
            size={style.starIcon.width}
            color={style.starIcon.color}
          />
          <Text style={style.headerRating}>{props.restaurant.rating}</Text>
        </View>
        <Text style={style.headerRatingCount}>1000+ Rating</Text>
      </View>
    </View>
  );
}

Header.defaultProps = {
  containerStyle: {},
};

export default Header;
