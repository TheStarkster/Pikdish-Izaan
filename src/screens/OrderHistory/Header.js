import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from './style';

import constants from '../../config/constants';
import ColoredCircle from '../../components/ColoredCircle';
import GeneralStyles from '../GeneralStyle';

function Header(props) {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Image
          // resizeMode="contain"
          style={styles.restaurantIcon}
          source={{uri: constants.RESTAURANT_LOGO_PATH + props.data.logo_pic}}
        />
        <View style={GeneralStyles.flex1}>
          <View style={styles.headerLeftSide}>
            {/* <ColoredCircle style={styles.greenCircle} /> */}
            <Text allowFontScaling={false} style={styles.text}>
              {props.data.restaurant_name}
            </Text>
          </View>
          <View style={GeneralStyles.flexRow}>
            <Text style={[styles.bottomText]}>{props.data.order_date}</Text>

            <Text style={[styles.bottomText]}>₹{props.data.total_amt}</Text>
          </View>
          <View style={GeneralStyles.flexRow}>
            <Text style={[styles.bottomText]}>
              Order # {props.data.order_no}
            </Text>
            <Text style={[styles.bottomText]}>
              {constants.ORDER_TYPES[props.data.order_type]}
            </Text>
          </View>
        </View>
        <Image
          source={require('../../assets/icon/down.png')}
          style={styles.downArrow}
        />
      </View>
    </View>
  );
}

export default Header;
