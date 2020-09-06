import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';

import helpers from '../../config/helpers';
import colors from '../../config/colors';
import constants from '../../config/constants';
import Button from '../../components/Button';

function PaySnippet(props) {
  function handlePayNow() {
    if (props.onPay) {
      return props.onPay();
    }

    props.navigation.navigate('PlaceOrder');
  }

  return (
    <View style={style.billContainer}>
      <View style={style.billDetails}>
        <TouchableOpacity>
          <Text style={style.bill}>₹{props.bill.totalBill}</Text>
          <Text style={style.detailBill}>Detailed Bill</Text>
        </TouchableOpacity>
      </View>
      <Button onPress={handlePayNow} buttonStyles={{marginTop: 0}}>
        Pay now
      </Button>
    </View>
  );
}

export default withNavigation(PaySnippet);

const style = StyleSheet.create({
  billContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  billDetails: {
    flex: 1,
    marginLeft: constants.MARGIN_MEDIUM,
  },
  bill: {
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Regular',
  },
  detailBill: {
    marginTop: -constants.MARGIN_SMALL * 0.5,
    fontSize: constants.FONT_SMALL,
    color: colors.RED,
    fontFamily: 'Nunito-Regular',
  },
});
