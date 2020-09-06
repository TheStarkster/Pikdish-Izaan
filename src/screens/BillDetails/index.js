import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import styles from './style';

import Item from './Item';
import Header from '../../components/Header';
import ColoredCircle from '../../components/ColoredCircle';
import GeneralStyles from '../GeneralStyle';

class BillDetails extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Header>Bill Detail</Header>
        <ScrollView>
          <View>
            <View style={styles.restaurantDetailsContainer}>
              <View style={GeneralStyles.secondContainer}>
                <View
                  style={[GeneralStyles.flexRow, GeneralStyles.alignCenter]}>
                  <ColoredCircle
                    style={styles.greenCircle}
                  />
                  <Text allowFontScaling={false} style={styles.restaurantName}>
                    Jodhpur Dabbawala
                  </Text>
                </View>
                <View style={styles.restaurantDetails}>
                  <Text style={styles.orderDetails}>Order No : 10</Text>
                  <Text style={styles.orderDetails}>11/17/2019</Text>
                </View>
                <View style={styles.restaurantDetails}>
                  <Text style={styles.orderDetails}>Total Amount: ₹115</Text>
                  <Text style={styles.orderDetails}>Table No: 10</Text>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.bgWhite}>
                <Item />
                <Item />
                <Item />
              </View>
            </View>
            <View style={styles.bgWhite}>
              <View
                style={[GeneralStyles.container, GeneralStyles.noMarginTop]}>
                <View style={styles.totalItemContainer}>
                  <Text style={styles.textStyle}>Item Total</Text>
                  <Text style={styles.textStyle}>₹105.00</Text>
                </View>
                <View style={styles.discount1Container}>
                  <Text style={styles.textStyle}>PIKDISH Discount</Text>
                  <Text style={styles.textStyle}>₹10.00</Text>
                </View>
                <View style={styles.discount2Container}>
                  <Text style={styles.textStyle}>Offer Discount</Text>
                  <Text style={styles.textStyle}>₹-21.00</Text>
                </View>
                <View style={styles.taxMainContainer}>
                  <View style={styles.taxContainer}>
                    <Text style={styles.textStyle}>SGST(2.5%)</Text>
                    <Text style={styles.textStyle}>₹09.00</Text>
                  </View>
                  <View style={styles.taxContainer}>
                    <Text style={styles.textStyle}>CGST(2.5%)</Text>
                    <Text style={styles.textStyle}>₹09.00</Text>
                  </View>
                  <View style={styles.taxContainer}>
                    <Text style={styles.textStyle}>IGST(2.5%)</Text>
                    <Text style={styles.textStyle}>₹09.00</Text>
                  </View>
                </View>
                <View style={styles.packingChargesContainer}>
                  <Text style={styles.textStyle}>
                    Restaurant Packing Charges
                  </Text>
                  <Text style={styles.textStyle}>₹105.00</Text>
                </View>
                <View style={styles.deliveryChargesContainer}>
                  <Text style={styles.textStyle}>Delivery Charges</Text>
                  <Text style={styles.textStyle}>₹105.00</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.grandTotalContainer}>
          <Text style={styles.grandTotal}>Grand Total</Text>
          <Text style={styles.grandTotal}>₹ 505.00</Text>
        </View>
      </View>
    );
  }
}

export default BillDetails;
