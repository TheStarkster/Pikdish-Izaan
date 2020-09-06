import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Platform} from 'react-native';
import {withNavigation} from 'react-navigation';

import Button from '../../components/Button';
import ColoredCircle from '../../components/ColoredCircle';
import constants from '../../config/constants';
import colors from '../../config/colors';
import GeneralStyle from '../GeneralStyle';

const Order = props => {
  function onCallWaiter() {
    props.onCallWaiter(true, props.data.restaurant_id);
  }

  function navigate() {
    props.navigateToBillDetails();
  }

  function getOrderTime() {
    let time = props.data.order_time
      ? props.data.order_time.split(':')
      : props.data.order_time;

    if (time) {
      time = time[0] + ':' + time[1];
    }

    return props.data.order_date + ' ' + time;
  }

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Image
          style={style.restaurantIcon}
          source={{uri: constants.RESTAURANT_LOGO_PATH + props.data.logo_pic}}
        />
        <View style={style.headingContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('RestaurantDetail')}>
            <Text allowFontScaling={false} style={[style.heading]}>
              {props.data.restaurant_name}
            </Text>
          </TouchableOpacity>
          <Text style={style.headingTime}>{getOrderTime()}</Text>
        </View>
        <View>
          <Text style={style.price}>₹ {props.data.total_amt}</Text>
          <Text style={[style.price, GeneralStyle.textRight]}>
            {constants.ORDER_TYPES[props.data.order_type]}
          </Text>
        </View>
      </View>
      <View>
        {props.data.order_l.map(item => (
          <Item
            key={Math.random().toString()}
            foodType={props.data.food_type}
            data={item}
          />
        ))}
      </View>
      <View style={style.buttonContainer}>
        <Button onPress={onCallWaiter} buttonStyles={style.button}>
          Call Waiter
        </Button>
        <Button buttonStyles={style.button} onPress={navigate}>
          Bill Detail
        </Button>
      </View>
    </View>
  );
};

Order.defaultProps = {
  data: {},
};

export default withNavigation(Order);

const style = StyleSheet.create({
  container: {
    marginTop: constants.MARGIN_SMALL * 1.5,
    paddingHorizontal: constants.PADDING_SMALL,
    paddingVertical: constants.PADDING_MEDIUM * 0.35,
    backgroundColor: 'white',
    ...GeneralStyle.boxShadow,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderColor: colors.GREY,
    borderBottomWidth: 0.5,
    paddingBottom: constants.PADDING_SMALL * 0.6,
    // paddingHorizontal: constants.PADDING_SMALL * 0.5,
    // backgroundColor: "red"
  },
  restaurantIcon: {
    width: constants.WINDOW_WIDTH * 0.15,
    height: constants.WINDOW_WIDTH * 0.15,
    borderRadius: constants.WINDOW_WIDTH * 0.03,
  },
  circle: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.5,
  },
  heading: {
    lineHeight: constants.FONT_SMALL_LINE_HEIGHT * 1.2,
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: constants.MARGIN_X_SMALL,
    maxWidth: 140,
    flex: 1,
  },
  dashedTopBorder: {
    width: '95%',
    marginTop: constants.MARGIN_VERTICAL_SMALL * 1.6,
    marginBottom: constants.MARGIN_VERTICAL_SMALL,
  },
  headingContainer: {
    marginLeft: constants.MARGIN_SMALL * 0.6,
    flex: 1,
  },
  // ITEM STYLES
  restaurantNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    // flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: constants.PADDING_SMALL,
    paddingHorizontal: constants.PADDING_SMALL * 0.5,
  },
  itemHeading: {
    // lineHeight: constants.FONT_SMALL_LINE_HEIGHT,
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Light',
    flex: 1,
  },
  itemCircle: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.3,
    marginRight: constants.WINDOW_WIDTH * 0.02,
    width: constants.WINDOW_WIDTH * 0.025,
    height: constants.WINDOW_WIDTH * 0.025,
  },
  headingTime: {
    fontSize: constants.FONT_X_SMALL,
    fontFamily: 'Nunito-Regular',
    color: colors.GREY,
    lineHeight: Platform.OS === "ios" ? 0 : 10,
  },
  priceContainer: {
    marginLeft: constants.WINDOW_WIDTH * 0.03 + constants.WINDOW_WIDTH * 0.02,
  },
  price: {
    fontFamily: 'Nunito-Light',
    fontSize: constants.FONT_X_SMALL,
  },
});

const Item = props => (
  <View style={style.itemContainer}>
    <View style={style.restaurantNameContainer}>
      <ColoredCircle
        color={props.foodType === '1' ? 'green' : 'red'}
        style={style.itemCircle}
      />
      <Text style={style.itemHeading}>{props.data.item_name}</Text>
      <Text style={style.headingTime}>{props.data.qty} Plate</Text>
    </View>
    <View style={style.priceContainer}>
      <Text style={style.price}>₹ {props.data.total_amount}</Text>
    </View>
  </View>
);
