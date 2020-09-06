import React, {Component} from 'react';
import {Text, View, Image, TouchableWithoutFeedback} from 'react-native';
import {withNavigation} from 'react-navigation';

import styles from './style';
import GeneralStyles from '../GeneralStyle';
import DateTimeBadge from '../../components/DateTimeBadge';

class EventListContainer extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.navigation.navigate('EventDetailPage')}>
        <View style={styles.eventListContianer}>
          <View style={[GeneralStyles.container, GeneralStyles.noMarginTop]}>
            <View style={styles.eventDetailsContainer}>
              <Text style={styles.eventDetails}>Name:</Text>
            </View>
            <View style={styles.eventDetailsContainer}>
              <Text style={styles.eventDetails}>Cafe name:</Text>
            </View>
            <View style={styles.miniContainer}>
              <View>
                <Text style={styles.eventDetails}>Ticket Price:</Text>
              </View>
              <View style={styles.dateTimeContainer}>
                <Text style={styles.eventDetails}>Date & Time:</Text>
                <DateTimeBadge />
              </View>
            </View>
            <View style={styles.bgImageContainer}>
              <Image
                source={require('../../assets/images/butter-chicken.jpg')}
                resizeMode="cover"
                style={styles.bgImage}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default withNavigation(EventListContainer);
