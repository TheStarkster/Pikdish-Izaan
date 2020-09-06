import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import helpers from '../../config/helpers';
import CustomizePopup from '../CustomizePopup';
import cartActions from '../../redux/cart/action';
import constants from '../../config/constants';
import ColoredCircle from '../../components/ColoredCircle';
import OutlineButton from '../../components/OutlineButton';
import GeneralStyle from '../../screens/GeneralStyle';
import style from './style';

const ItemList = props => {
  const [amount, setAmount] = useState(0);
  const [isCustomizeModal, setIsCustomizeModal] = useState(false);

  useEffect(() => {
    const items = [...props.cart.order_items];

    const index = items.findIndex(item => item.rest_item_id === props.data.id);

    if (index !== -1) {
      setAmount(Number(items[index].qty));
    } else {
      setAmount(0);
    }
  }, [[...props.cart.order_items]]);

  function handleCustomizeModalChange(data) {
    let items = [...props.cart.order_items];

    const index = items.findIndex(item => item.rest_item_id === props.data.id);

    items[index] = {
      ...items[index],
      addon_items: data.addon,
      rest_portion_id: data.portion || props.data.port_id,
      preparation_type: data.preparationType || '',
      topping_items: data.topping,
    };

    props.setItem(items);

    setIsCustomizeModal(false);
  }

  function isItemDiscount() {
    const {restaurant} = props;

    return (
      restaurant.is_happy_hours === constants.ITEM_DISCOUNT_CODE &&
      restaurant.is_hh_running.happy_hour === constants.ITEM_DISCOUNT_TEXT
    );
  }

  function isFlatDiscount() {
    const {restaurant} = props;

    return (
      restaurant.is_happy_hours === constants.FLAT_DISCOUNT_CODE &&
      restaurant.is_hh_running.happy_hour === constants.FLAT_DISCOUNT_TEXT
    );
  }

  function calculateDiscount() {
    const percent =
      props.data.baserate *
      (props.restaurant.is_hh_running.flat_discount / 100);

    const price = props.data.baserate - percent;
    return '₹' + price;
  }

  function renderPrice() {
    if (isFlatDiscount()) {
      return (
        <>
          <Text style={[style.price, style.priceCut]}>
            ₹{props.data.baserate}
          </Text>
          <Text style={[style.price, {marginLeft: 5}]}>
            ₹{helpers.getPrice(props.data, props.restaurant)}
          </Text>
        </>
      );
    }

    if (isItemDiscount()) {
      return (
        <>
          <Text style={[style.price, style.priceCut]}>
            ₹{props.data.baserate}
          </Text>
          <Text style={[style.price, {marginLeft: 5}]}>
            ₹{helpers.getPrice(props.data, props.restaurant)}
          </Text>
        </>
      );
    }

    return <Text style={style.price}>₹{props.data.baserate}</Text>;
  }

  function addItem() {
    const items = [...props.cart.order_items];

    if (!items.length) {
      props.setCartRestaurant(props.restaurant);
    } else {
    }

    const index = items.findIndex(item => item.rest_item_id === props.data.id);

    if (index === -1) {
      const payload = {
        rest_item_id: props.data.id,
        rate_per_qty: props.data.baserate,
        baserate: props.data.baserate,
        qty: '1',
        item_name: props.data.item_name,
        is_veg: props.data.is_veg,
        happyrate: props.data.happyrate,
        is_combo: props.data.is_combo,
        rest_portion_id: props.data.port_id,
        preparation_type: '',
        addon_items: [],
        topping_items: [],
        combo_items: [],
      };

      items.push(payload);

      props.setItem(items);

      if (helpers.isCustomizable(props.data)) {
        handleCustomizationClick();
      }

      return setAmount(1);
    }

    items[index].qty = (Number(items[index].qty) + 1).toString();
    props.setItem(items);
    setAmount(Number(items[index].qty));
  }

  function substractItem() {
    const items = [...props.cart.order_items];

    const index = items.findIndex(item => item.rest_item_id === props.data.id);

    if (items[index].qty === '1') {
      items.splice(index, 1);

      setAmount(0);

      return props.setItem(items);
    }

    items[index].qty = (amount - 1).toString();

    setAmount(amount - 1);

    props.setItem(items);
  }

  function onAmountChange(type) {
    if (type === 'add') {
      addItem();
    }
    if (type === 'substract') {
      substractItem();
    }
  }

  function handleCustomizationClick() {
    setIsCustomizeModal(true);
  }

  function renderCustomizable() {
    if (!helpers.isCustomizable(props.data)) {
      return null;
    }

    return (
      <TouchableOpacity
        disabled={amount <= 0}
        onPress={handleCustomizationClick}>
        <Text style={style.customizableText}>Customizable</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={style.container}>
      <View style={style.innerContainer}>
        <ColoredCircle
          color={props.data.is_veg === '1' ? 'green' : 'red'}
          style={style.box}
        />
        <View style={[GeneralStyle.flex1]}>
          <Text style={style.item}>{props.data.item_name}</Text>
          <View style={[GeneralStyle.flexRow]}>{renderPrice()}</View>
          <Text numberOfLines={1} style={style.extra}>
            {props.data.description}
          </Text>
        </View>
        <View>
          <OutlineButton
            onPress={() => onAmountChange('add')}
            onPlus={() => onAmountChange('add')}
            onSubtract={() => onAmountChange('substract')}
            customizable={amount > 0}
            amount={amount}
            buttonStyles={style.button}
            containerStyles={style.buttonContainer}>
            ADD
          </OutlineButton>
          {renderCustomizable()}
        </View>
      </View>
      <CustomizePopup
        data={props.data}
        onClose={handleCustomizeModalChange}
        visible={isCustomizeModal}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  cart: store.cart.cart,
  restaurant: store.selectedRestaurant.restaurant,
});

const mapDispatchToProps = {
  setItem: cartActions.setItem,
  setCartRestaurant: cartActions.setCartRestaurant,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemList);
