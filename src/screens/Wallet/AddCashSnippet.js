import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import CashButton from './CashButton';
import Input from '../../components/Input';
import Button from '../../components/Button';
import GeneralStyle from '../GeneralStyle';
import constants from '../../config/constants';
import colors from '../../config/colors';

function AddCashSnippet() {
  const [amount, setAmount] = useState('');

  function handleChange(e) {
    setAmount(e);
  }

  function addPresetAmount(value) {
    setAmount(value);
  }

  return (
    <View style={style.container}>
      <View style={style.firstContainer}>
        <Image
          source={require('../../assets/icon/add2.png')}
          style={style.icon}
        />
        <Text style={style.addText}>ADD PIKDISH CASH</Text>
      </View>
      <View style={style.secondContainer}>
        <Input
          value={amount}
          containerStyle={GeneralStyle.flex1}
          onChangeText={handleChange}
          keyboardType="number-pad"
          label="Enter Amount"
          prefix="₹"
        />
        <Button buttonStyles={style.button}>ADD</Button>
      </View>
      <View style={style.thirdContainer}>
        <CashButton
          active={amount === 1000}
          amount={1000}
          onPress={() => addPresetAmount(1000)}
        />
        <CashButton
          active={amount === 2000}
          amount={2000}
          onPress={() => addPresetAmount(2000)}
        />
        <CashButton
          active={amount === 3000}
          amount={3000}
          onPress={() => addPresetAmount(3000)}
        />
      </View>
    </View>
  );
}

export default AddCashSnippet;

const style = StyleSheet.create({
  container: {
    minHeight: constants.WINDOW_HEIGHT * 0.2,
    backgroundColor: colors.WHITE,
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
    marginHorizontal: constants.MARGIN_SMALL,
    paddingHorizontal: constants.PADDING_SMALL,
    paddingBottom: constants.PADDING_VERTICAL_MEDIUM,
    ...GeneralStyle.boxShadow,
  },
  firstContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: constants.PADDING_VERTICAL_MEDIUM,
    borderColor: colors.GREY,
    borderBottomWidth: 0.5,
  },
  icon: {
    width: constants.WINDOW_WIDTH * 0.04,
    height: constants.WINDOW_WIDTH * 0.04,
    marginRight: constants.MARGIN_SMALL,
  },
  addText: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 0.8,
  },
  secondContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 0,
    marginLeft: constants.MARGIN_SMALL,
    width: constants.WINDOW_WIDTH * 0.25,
  },
  thirdContainer: {
    flexDirection: 'row',
    marginTop: constants.MARGIN_VERTICAL_XSMALL,
  },
});
