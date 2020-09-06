import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

import helpers from '../../config/helpers';
import style from './style';
import GeneralStyle from '../../screens/GeneralStyle';

function CartSnippet(props) {
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    simplifyItems();
  }, [props.cart]);

  function simplifyItems() {
    const {cart, items = []} = props;
    const allItems = [];

    items.forEach(item => {
      if (Array.isArray(item.item)) {
        item.item.forEach(item2 => {
          const isFound = cart.order_items.find(
            a => a.rest_item_id === item2.id,
          );

          if (isFound) {
            allItems.push({...item2, qty: isFound.qty});
          }
        });
      }

      const isFound = cart.order_items.find(a => a.rest_item_id === item.id);

      if (isFound) {
        allItems.push({...item, qty: isFound.qty});
      }
    });

    setAllItems(allItems);
  }

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={GeneralStyle.flexRow}>
          <Image
            resizeMode="cover"
            style={style.image}
            source={require('../../assets/icon/cart.png')}
          />
          <Text style={style.viewCart}>View Cart</Text>
        </View>
      </TouchableOpacity>
      <View style={GeneralStyle.flexRow}>
        <Text style={style.price}>
          {helpers.calculateItemCount(props.cart.order_items)} Items
        </Text>
        <Text style={style.price}>|</Text>
        <Text style={style.price}>
          ₹
          {helpers.calculateTotalPrice(
            allItems,
            props.restaurant,
            props.cart.order_items,
          )}
        </Text>
      </View>
    </View>
  );
}

const mapStateToProps = store => ({
  cart: store.cart.cart,
  restaurant: store.selectedRestaurant.restaurant,
  items: store.selectedRestaurant.items,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(CartSnippet));
