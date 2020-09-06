import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import ColoredCircle from '../../components/ColoredCircle';
import OutlineButton from '../../components/OutlineButton';
import constants from '../../config/constants';
import colors from '../../config/colors';
import GeneralStyle from '../GeneralStyle';

export default function(props) {
  const [amount, setAmount] = useState(0);

  function add() {
    setAmount(amount + 1);
  }

  function subtract() {
    setAmount(amount - 1);
  }

  return (
    <View style={style.container}>
      <View style={GeneralStyle.flex1}>
        <View style={[style.leftContainer]}>
          <View style={style.circleContainer}>
            <ColoredCircle />
          </View>
          <Text>Pizza</Text>
        </View>
        <View style={style.detailsContainer}>
          <Text style={style.amount}>₹24</Text>
          <Text style={style.plate}>1 Plate</Text>
        </View>
      </View>
      <View style={style.buttonContainer}>
        <OutlineButton
          showCustomization={true}
          onPress={add}
          onPlus={add}
          onSubtract={subtract}
          amount={amount}
          customizable={amount > 0}
          containerStyles={style.button}
          onCustomizePress={props.onCustonmizeClick}
          >
          ADD
        </OutlineButton>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: constants.MARGIN_VERTICAL_XSMALL,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleContainer: {
    marginRight: constants.MARGIN_VERTICAL_XSMALL,
  },
  detailsContainer: {
    marginLeft:
      constants.WINDOW_WIDTH * 0.03 + constants.MARGIN_VERTICAL_XSMALL,
  },
  amount: {
    fontSize: constants.FONT_X_SMALL,
    color: colors.GREY,
  },
  plate: {
    fontSize: constants.FONT_X_SMALL,
    color: colors.GREY,
  },
  buttonContainer: {
    width: constants.WINDOW_WIDTH * 0.2,
  },
  button: {
    flex: 0,
    height: constants.WINDOW_HEIGHT * 0.065,
  },
});
