import React from 'react';
import {View, Text} from 'react-native';

import style from './style';

const RestaurantBill = props => (
  <View style={style.container}>
    <Text style={style.heading}>Restaurant Bill</Text>
    <View>
      <List label="Item Total" value={props.bill.itemTotal} />
      {!!props.bill.sgstPercentage && (
        <List
          label={`SGST(${props.bill.sgstRatio}%)`}
          value={props.bill.sgstPercentage}
        />
      )}
      {!!props.bill.serviceCharges && (
        <List label={`Service Charges`} value={props.bill.serviceCharges} />
      )}
      {!!props.cgstPercentage && (
        <List
          label={`CGST(${props.bill.cgstRatio}%)`}
          value={props.bill.cgstPercentage}
        />
      )}
      {!!props.bill.igstPercentage && (
        <List
          label={`IGST(${props.bill.igstRatio}%)`}
          value={props.bill.igstPercentage}
        />
      )}
      {!!props.bill.restaurantDiscount && (
        <List
          label={`Restaurant Discount`}
          value={props.bill.restaurantDiscount}
        />
      )}
      <List label="Offer discount" value={0} />

      {props.bill.packingCharges !== undefined && (
        <List
          label="Restaurant Packing Charges"
          value={props.bill.packingCharges}
        />
      )}
      {props.bill.deliveryCharges !== undefined && (
        <View style={style.deliveryContainer}>
          <List label="Delivery Charges" value={props.bill.deliveryCharges} />
        </View>
      )}
      <List label="Grand Total" value={props.bill.totalBill} />
      <View style={style.messageContainer}>
        <Text style={style.message}>You have saved 21 on the bill</Text>
      </View>
    </View>
  </View>
);

RestaurantBill.defaultProps = {
  bill: {},
};

export default RestaurantBill;

const List = props => (
  <View style={style.listContainer}>
    <Text style={style.listItem}>{props.label}</Text>
    <Text style={style.listItem}>₹{props.value}</Text>
  </View>
);
