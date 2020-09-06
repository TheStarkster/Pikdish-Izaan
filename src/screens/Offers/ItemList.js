import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';

import ColoredCircle from '../../components/ColoredCircle';
import CircleHeart from '../../components/CircleHeart';
import style from './ItemListStyle';
import GeneralStyle from '../GeneralStyle';
import constants from '../../config/constants';

const ItemList = props => {
  return (
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
              props.data.food_type === constants.VEG_FOOD_TYPE ? 'green' : 'red'
            }
            style={style.circle}
          />
          <Text style={[style.restaurantName]}>
            {props.data.restaurant_name}
          </Text>
        </View>
        <View style={style.detailsContainer}>
          <Text style={style.type}>Use coupon {props.data.coupon_code}</Text>
          <View
            style={[
              GeneralStyle.flexRow,
              GeneralStyle.alignCenter,
              GeneralStyle.smallMarginTop,
            ]}>
            <Image
              source={require('../../assets/icon/star.png')}
              style={style.star}
              resizeMode="cover"
            />
            <Text style={style.rating}>{props.data.rating}</Text>
            <Text style={style.rating}>|</Text>
            <Text style={style.rating}>{props.data.preparation_time} mins</Text>
            <Text style={style.rating}>|</Text>
            <Text style={style.rating}>On all orders</Text>
          </View>
        </View>
        {/* <View style={[style.detailsText]}>
            <View style={GeneralStyle.flexRow}>
              <ColoredCircle style={style.circle} />
              <View>
                <Text style={[style.restaurantName]}>Jodhpur Dabbawala</Text>
                <Text style={style.type}>Use coupon PIKDISH</Text>
                <View
                  style={[
                    GeneralStyle.flexRow,
                    GeneralStyle.alignCenter,
                    GeneralStyle.smallMarginTop,
                  ]}>
                  <Image
                    source={require('../../assets/icon/star.png')}
                    style={style.star}
                    resizeMode="cover"
                  />
                  <Text style={style.rating}>4.4</Text>
                  <Text style={style.rating}>|</Text>
                  <Text style={style.rating}>30 mins</Text>
                  <Text style={style.rating}>|</Text>
                  <Text style={style.rating}>On all orders</Text>
                </View>
              </View>
            </View>
          </View> */}
      </View>
      <View style={style.rightContainer}>
        <View style={style.discountContainer}>
          <Image
            style={style.discountIcon}
            resizeMode="cover"
            source={require('../../assets/icon/discount.png')}
          />
          <Text style={style.discount}>24% Off</Text>
        </View>
      </View>
    </View>
  );
};
export default withNavigation(ItemList);
