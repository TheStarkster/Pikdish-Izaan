import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

import styles from './style';
import GeneralStyles from '../GeneralStyle';

export default class Coupans extends Component {
  render() {
    return (
      <View style={GeneralStyles.alignCenter}>
        <View style={styles.coupansMainContainer}>
          <View style={styles.coupansMiniContainer}>
            <View style={styles.buttonBox}>
              <Image
                resizeMode="cover"
                style={styles.paytmIcon}
                source={require('../../assets/icon/paytm.png')}
              />
              {/* <Text style={styles.paytmText}>Paytm</Text> */}
              <Text style={styles.pmnewaprText}>PMNEWAPR</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.applyText}>APPLY</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.coupanTextBox}>
            <Text style={styles.coupansDiscText}>
              Get 50% discount on Paytm
            </Text>
            <Text style={styles.coupansDiscDetails}>
              Use code PMNEWARP and get flat Rs.50 cashback on you orders above
              Rs. 419
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
