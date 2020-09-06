import React from 'react';
import {Text, View, Image} from 'react-native';
import moment from 'moment';

import styles from './style';

function DateTimeBadge(props) {
  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.date}>{moment(props.date).format('DD/MM/YYYY')}</Text>
      <Text style={styles.time}>
        {moment(props.date + ' ' + props.time).format('h:mm A')}
      </Text>
      {/* <Image
        source={require('../../assets/images/clock.png')}
        style={styles.clockIcon}
      /> */}
    </View>
  );
}

export default DateTimeBadge;
