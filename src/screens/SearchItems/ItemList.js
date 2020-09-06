import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';

import ColoredCircle from '../../components/ColoredCircle';
import CircleHeart from '../../components/CircleHeart';
import style from './ItemListStyle';
import GeneralStyle from '../GeneralStyle';

const ItemList = props => (
  <TouchableOpacity
    onPress={() => props.navigation.navigate('RestaurantItems')}>
    <View style={style.container}>
      <Image
        resizeMode="cover"
        style={style.image}
        source={{
          uri:
            'https://sifu.unileversolutions.com/image/en-AU/recipe-topvisual/2/1260-709/beef-burger-with-deep-fried-bacon-and-thousand-island-dressing-50247463.jpg',
        }}
      />
      <View style={style.details}>
        <View style={style.restaurantNameContainer}>
          <ColoredCircle style={style.box} />
          <Text style={style.restaurantName}>Jodhpur Dabbawala</Text>
        </View>
        <View style={style.restaurantDetailsContainer}>
          <Text style={style.type}>Mexican, Italian</Text>
          <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
            <Image
              source={require('../../assets/icon/star.png')}
              style={style.star}
              resizeMode="cover"
            />
            <Text style={style.rating}>4.4</Text>
            <Text style={style.rating}>|</Text>
            <Text style={style.rating}>30 mins</Text>
          </View>
        </View>
      </View>
      {/* <View style={style.details}>
        <ColoredCircle style={style.box} />
        <View style={[style.detailsText]}>
          <Text style={style.restaurantName}>Jodhpur Dabbawala</Text>
          <Text style={style.type}>Mexican, Italian</Text>
          <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
            <Image
              source={require('../../assets/icon/star.png')}
              style={style.star}
              resizeMode="cover"
            />
            <Text style={style.rating}>4.4</Text>
            <Text style={style.rating}>|</Text>
            <Text style={style.rating}>30 mins</Text>
          </View>
        </View>
      </View> */}
      <View style={style.rightContainer}>
        <View style={style.discountContainer}>
          <Image
            style={style.discountIcon}
            resizeMode="cover"
            source={require('../../assets/icon/discount.png')}
          />
          <Text style={style.discount}>24% Off</Text>
        </View>
        <CircleHeart containerStyles={style.heartContainer} />
      </View>
    </View>
  </TouchableOpacity>
);

export default withNavigation(ItemList);
