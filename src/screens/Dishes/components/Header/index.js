import React from 'react';
import {View, Text, Image} from 'react-native';

import helpers from '../../../../config/helpers';
import GeneralStyle from '../../../GeneralStyle';
import style from './style';
import ColoredCircle from '../../../../components/ColoredCircle';

export default function(props) {
  return (
    <View style={style.headerContainer}>
      <View style={GeneralStyle.flex1}>
        <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
          <ColoredCircle />
          <View style={style.restaurantDetails}>
            <Text style={style.restaurantName}>
              {props.restaurant.restaurant_name}
            </Text>
          </View>
        </View>
        <View style={style.restaurantDetails2}>
          <Text style={style.restaurantLabel}>
            {helpers.getCuisine(props.restaurant)}
          </Text>
          <View style={style.ratingContainer}>
            <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
              <Image
                style={style.star}
                source={require('../../../../assets/icon/star.png')}
              />
              <Text style={style.rating}>{props.restaurant.rating}</Text>
              <Text style={style.time}>
                {props.restaurant.preparation_time} mins
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={style.tableContainer}>
        {props.selectedTable && (
          <Text style={style.table}>{props.selectedTable}</Text>
        )}
      </View>
    </View>
  );
}
