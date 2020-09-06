import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';

import List from './List';
import WalletBenefit from './WalletBenefit';
import AddCashSnippet from './AddCashSnippet';
import Header from '../../components/Header';
import GeneralStyle from '../GeneralStyle';
import style from './style';

class ViewCart extends Component {
  state = {};

  render() {
    return (
      <View style={GeneralStyle.flex1}>
        <Header>Wallet</Header>
        <ScrollView
          contentContainerStyle={GeneralStyle.flexGrow1}
          style={GeneralStyle.backgroundLightGrey}>
          <View style={style.container}>
            <View style={style.topContainer}>
              <View style={style.balanceContainer}>
                <Text style={style.balanceTitle}>Wallet Balance</Text>
                <Text style={style.balance}>₹ 0.0</Text>
              </View>
              <View>
                <List label="PIKDISH CASH" value="0.0" />
                <List
                  label="REWARD POINTS"
                  value="0.0"
                  containerStyles={style.listContainer}
                />
              </View>
            </View>
            <View style={style.secondContainer}>
              <AddCashSnippet />
            </View>
            <View style={style.thirdContainer}>
              <WalletBenefit />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ViewCart;
