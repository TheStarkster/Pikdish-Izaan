import React, {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import CustomizePopup from '../../components/CustomizePopup';
import ConfirmationPopup from '../../components/ConfirmationPopup';
import cartActions from '../../redux/cart/action';
import OutlineButton from '../../components/OutlineButton';
import ColoredCircle from '../../components/ColoredCircle';
import GeneralStyle from '../GeneralStyle';
import constants from '../../config/constants';
import colors from '../../config/colors';
import helpers from '../../config/helpers';

const style = StyleSheet.create({
  container: {
    width: constants.WINDOW_WIDTH * 0.4,
    // minHeight: constants.WINDOW_WIDTH * 0.4,
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
    marginBottom: constants.MARGIN_VERTICAL_SMALL,
  },
  image: {
    width: '100%',
    height: constants.WINDOW_WIDTH * 0.23,
    borderRadius: constants.WINDOW_WIDTH * 0.05,
  },
  dish: {
    color: colors.DARK_GREY,
    fontSize: constants.FONT_SMALL * 0.7,
    fontFamily: 'Nunito-Regular',
    // marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.5,
    marginLeft: constants.MARGIN_X_SMALL,
  },
  content: {
    // paddingLeft: constants.PADDING_X_SMALL,
  },
  meal: {
    fontSize: constants.FONT_X_SMALL,
    // marginLeft: constants.MARGIN_X_SMALL,
    fontFamily: 'Nunito-Bold',
  },
  greenBox: {
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.8,
    // marginLeft: constants.MARGIN_SMALL * 0.6,
    width: constants.WINDOW_WIDTH * 0.03,
    height: constants.WINDOW_WIDTH * 0.03,
    borderColor: 'green',
    borderWidth: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenCircle: {
    width: constants.WINDOW_WIDTH * 0.02,
    height: constants.WINDOW_WIDTH * 0.02,
    backgroundColor: 'green',
    borderRadius: (constants.WINDOW_WIDTH * 0.02) / 2,
  },
  circle: {
    width: constants.WINDOW_WIDTH * 0.025,
    height: constants.WINDOW_WIDTH * 0.025,
    marginBottom: constants.FONT_SMALL * 0.17,
    // marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.6,
  },
  price: {
    fontSize: constants.FONT_SMALL * 0.9,
    color: colors.RED,
    fontFamily: 'Nunito-Regular',
    flex: 1,
  },
  priceCut: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: colors.GREY,
  },
  customizeText: {
    color: colors.GREY,
    fontSize: constants.FONT_X_SMALL,
    fontFamily: 'Nunito-Regular',
    textAlign: 'right',
  },
  itemNameContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  button: {
    paddingVertical: 3,
  },
});

const ItemCard = props => {
  const [amount, setAmount] = useState(0);
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);
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

  function increaseAmount() {
    setAmount(amount + 1);

    props.onShowSuggestion();
  }

  function renderPrice() {
    if (props.isHappy) {
      return (
        <>
          <Text style={[style.price, style.priceCut]}>
            ₹{props.data.baserate}
          </Text>
          <Text style={style.price}>
            ₹{helpers.getPrice(props.data, props.restaurant)}
          </Text>
        </>
      );
    }

    return (
      <Text style={style.price}>
        ₹{helpers.getPrice(props.data, props.restaurant)}
      </Text>
    );
  }

  function renderCustomizable() {
    if (!helpers.isCustomizable(props.data)) {
      return null;
    }

    return (
      <TouchableOpacity disabled={amount <= 0} onPress={handleCustomizeClick}>
        <Text style={style.customizeText}>Customizable</Text>
      </TouchableOpacity>
    );
  }

  function addItem(shouldNotConfirm) {
    let items = [...props.cart.order_items];

    if (shouldNotConfirm) {
      items = [];
    }

    if (
      props.cartRestaurant &&
      props.cartRestaurant.restaurant_id !== props.restaurant.restaurant_id &&
      !shouldNotConfirm
    ) {
      return setIsConfirmationModal(true);
    }

    props.setCartRestaurant(props.restaurant);

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
        addon_items: [],
        topping_items: [],
        combo_items: [],
        is_combo: props.data.is_combo,
        rest_portion_id: props.data.port_id,
      };

      items.push(payload);

      props.setItem(items);

      if (helpers.isCustomizable(props.data)) {
        handleCustomizeClick();
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

  function handleCustomizeModalChange(_, data) {
    let items = [...props.cart.order_items];

    const index = items.findIndex(item => item.rest_item_id === props.data.id);

    items[index] = {
      ...items[index],
      addon_items: data.addon,
      rest_portion_id: data.portion || props.data.port_id,
      preparation_type: data.preparationType,
      topping_items: data.topping,
    };

    props.setItem(items);

    setIsCustomizeModal(false);
  }

  function handleCustomizeClick() {
    setIsCustomizeModal(true);
  }

  function handleConfirmationPopupClose(isPositive) {
    if (isPositive) {
      props.clearCart();
      addItem(true);
    }

    setIsConfirmationModal(false);
  }

  function getConfirmationPopupTitle() {
    const name = props.cartRestaurant
      ? props.cartRestaurant.restaurant_name
      : '';

    return `Your cart has items from ${name}, do you want to discard your cart`;
  }

  return (
    <View style={style.container}>
      <Image
        // resizeMode="contain"
        style={style.image}
        source={{uri: constants.ITEM_PIC_PATH + props.data.item_image}}
      />
      <View style={style.content}>
        <View style={style.itemNameContainer}>
          <ColoredCircle
            color={props.data.is_veg === '1' ? 'green' : 'red'}
            style={style.circle}
          />
          <Text style={style.dish}>{props.data.item_name}</Text>
        </View>
        {/* <View style={[GeneralStyle.flexRow]}>
          <Text style={[style.meal, {flex: 1, flexWrap: 'wrap'}]}>
            Ala carter and value meal
          </Text>
        </View> */}
        <View
          style={[
            GeneralStyle.flexRow,
            GeneralStyle.smallMarginTop,
            GeneralStyle.alignCenter,
          ]}>
          <View style={GeneralStyle.flex1}>{renderPrice()}</View>
          <View style={[GeneralStyle.flex1]}>
            <View style={GeneralStyle.flexRow}>
              <OutlineButton
                buttonStyles={style.button}
                amount={amount}
                onPress={() => onAmountChange('add')}
                onPlus={() => onAmountChange('add')}
                onSubtract={() => onAmountChange('substract')}
                customizable={amount > 0}>
                ADD
              </OutlineButton>
            </View>
            {renderCustomizable()}
          </View>
        </View>
      </View>
      <CustomizePopup
        data={props.data}
        onClose={handleCustomizeModalChange}
        visible={isCustomizeModal}
      />
      <ConfirmationPopup
        visible={isConfirmationModal}
        onClose={handleConfirmationPopupClose}
        heading="Cart Alert"
        message={getConfirmationPopupTitle()}
      />
    </View>
  );
};

ItemCard.defaultProps = {
  onShowSuggestion: function() {},
};

const mapStateToProps = store => ({
  cart: store.cart.cart,
  cartRestaurant: store.cart.restaurant,
  restaurant: store.selectedRestaurant.restaurant,
});

const mapDispatchToProps = {
  setItem: cartActions.setItem,
  clearCart: cartActions.clearCart,
  setCartRestaurant: cartActions.setCartRestaurant,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemCard);
