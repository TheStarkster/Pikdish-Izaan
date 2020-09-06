import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import constants from '../../config/constants';

function WalletBenefit() {
  return (
    <View style={style.container}>
      <Text style={style.title}>PIKDISH WALLET BENEFITS</Text>
    </View>
  );
}

export default WalletBenefit;

const style = StyleSheet.create({
  container: {
    paddingVertical: constants.PADDING_VERTICAL_MEDIUM,
    paddingHorizontal: constants.PADDING_SMALL,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'Nunito-Regular',
  },
});
