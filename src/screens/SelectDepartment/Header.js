import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import GeneralStyles from '../GeneralStyle';
import constants from '../../config/constants';
import colors from '../../config/colors';
import ColoredCircle from '../../components/ColoredCircle';

function Header(props) {
  function getCuisine() {
    const {restaurant} = props;

    const cuisine = restaurant.cuisine
      .map(item => item.cuisine_name)
      .join(', ');

    return cuisine;
  }

  return (
    <View style={[style.container]}>
      <Image
        source={{
          uri: constants.RESTAURANT_LOGO_PATH + props.restaurant.logo_pic,
        }}
        resizeMode="contain"
        style={style.bookingPageImage}
      />
      <View style={style.miniContainer}>
        <Text style={style.restaurantName}>
          {props.restaurant.restaurant_name}
        </Text>
        <Text style={style.cuisine}>{getCuisine()}</Text>
        <View style={style.ratingContainer}>
          <AntDesign name="star" style={style.starIcon} />
          <Text style={style.rating}>{props.restaurant.rating}</Text>
          <Entypo name="dot-single" style={style.dotIcon} />
          <Text style={style.time}>30 mins</Text>
          <Entypo name="dot-single" style={style.dotIcon} />
          <ColoredCircle style={style.greenCircle} />
          <ColoredCircle color="red" />
        </View>
      </View>
    </View>
  );
}

export default Header;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: constants.PADDING_VERTICAL_MEDIUM * 1.8,
    borderBottomColor: colors.GREY,
    borderBottomWidth: 0.5,
  },
  cuisine: {
    color: colors.BLACK,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL,
    borderBottomColor: colors.GREY,
    borderBottomWidth: 0.5,
    marginTop: -constants.MARGIN_VERTICAL_XSMALL * 0.3,
    paddingBottom: constants.PADDING_VERTICAL_MEDIUM * 0.3,
  },
  bookingPageImage: {
    width: constants.WINDOW_WIDTH * 0.29,
    height: constants.WINDOW_WIDTH * 0.24,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: constants.MARGIN_X_SMALL,
  },
  miniContainer: {
    marginLeft: constants.MARGIN_SMALL * 1.2,
  },
  restaurantName: {
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL * 1.2,
    // borderBottomWidth: 0.5,
    // borderBottomColor: colors.GREY,
    // borderStyle: 'solid',
    // paddingBottom: constants.PADDING_X_SMALL,
  },
  starIcon: {
    color: colors.GREY,
  },
  rating: {
    marginLeft: constants.MARGIN_X_SMALL,
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL,
  },
  dotIcon: {
    fontSize: constants.FONT_SMALL * 1.2,
    color: colors.GREY,
  },
  greenCircle: {
    marginRight: constants.MARGIN_X_SMALL,
  },
  time: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL,
  },
});
