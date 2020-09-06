import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import helpers from '../../config/helpers';
import cartActions from '../../redux/cart/action';
import constants from '../../config/constants';
import colors from '../../config/colors';
import ColoredCircle from '../../components/ColoredCircle';
import OutlineButton from '../../components/OutlineButton';
import GeneralStyle from '../GeneralStyle';

const ItemList = props => {
  const [amount, setAmount] = useState(props.data.qty);
  const data = props.data;

  useEffect(() => {
    setAmount(props.data.qty);
  }, [props.data]);

  function addItem() {
    const items = [...props.cart.order_items];

    const index = items.findIndex(
      item => item.rest_item_id === props.data.rest_item_id,
    );

    items[index].qty = (Number(items[index].qty) + 1).toString();
    props.setItem(items);
    setAmount(Number(items[index].qty));
  }

  function substractItem() {
    const items = [...props.cart.order_items];

    const index = items.findIndex(
      item => item.rest_item_id === props.data.rest_item_id,
    );

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

  function shouldCustomize() {
    const portions = props.fullData.portions || [];
    const topping = props.fullData.topping || [];
    const addon = props.fullData.addon || [];

    if (!portions.length && !topping.length && !addon.length) {
      return false;
    }

    return true;
  }

  function renderPrice() {
    if (helpers.isFlatDiscount(props.restaurant)) {
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

    if (helpers.isItemDiscount(props.restaurant)) {
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

  return (
    <View style={style.container}>
      <ColoredCircle
        color={props.data.is_veg === '1' ? 'green' : 'red'}
        style={style.circle}
      />
      <View style={style.details}>
        <Text style={style.itemName}>{data.item_name}</Text>
        <View style={[GeneralStyle.flexRow]}>{renderPrice()}</View>
        <Text style={style.plate}>{data.price} Plate</Text>
      </View>
      <View style={style.buttonContainer}>
        <OutlineButton
          containerStyles={{flex: 0}}
          onCustomizePress={props.onCustomizePress}
          onPlus={() => onAmountChange('add')}
          onSubtract={() => onAmountChange('substract')}
          amount={amount}
          customizable={amount > 0}
          showCustomization={shouldCustomize()}
          buttonStyles={style.button}>
          ADD
        </OutlineButton>
      </View>
    </View>
  );
};

ItemList.defaultProps = {
  onPlus: function() {},
  onSubtract: function() {},
};

const mapStateToProps = store => ({
  cart: store.cart.cart,
});

const mapDispatchToProps = {
  setItem: cartActions.setItem,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemList);

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.3,
  },
  buttonContainer: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.5,
  },
  details: {
    flex: 1,
    // marginLeft: constants.MARGIN_SMALL,
  },
  itemName: {
    fontFamily: 'Nunito-Regular',
  },
  circle: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.7,
    marginRight: constants.MARGIN_MEDIUM * 0.3,
    width: constants.WINDOW_WIDTH * 0.03,
    height: constants.WINDOW_WIDTH * 0.03,
  },
  price: {
    fontSize: constants.FONT_X_SMALL,
    color: colors.RED,
  },
  plate: {
    fontSize: constants.FONT_X_SMALL,
    color: colors.GREY,
  },
  priceCut: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: colors.GREY,
  },
  button: {
    flex: 0,
    height: constants.WINDOW_HEIGHT * 0.04,
    width: constants.WINDOW_WIDTH * 0.2,
    paddingHorizontal: constants.PADDING_X_SMALL,
    alignSelf: 'center',
  },
});
