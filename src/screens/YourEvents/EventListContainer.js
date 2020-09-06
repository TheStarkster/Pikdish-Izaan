import React from 'react';
import {Text, View, Image, TouchableWithoutFeedback} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

import styles from './style';
import GeneralStyles from '../GeneralStyle';
import DateTimeBadge from '../../components/DateTimeBadge';
import constants from '../../config/constants';

function EventListContainer(props) {
  function navigate() {
    if (props.tab === 'past') return;

    props.navigation.navigate('EventDetailPage', {event: props.data});
  }

  return (
    <TouchableWithoutFeedback onPress={navigate}>
      <View style={styles.eventListContianer}>
        <View style={[GeneralStyles.container, GeneralStyles.noMarginTop]}>
          <View style={styles.eventDetailsContainer}>
            <Text
              style={[styles.eventDetails, {color: props.theme.theme_colour}]}>
              Name:
            </Text>
            <Text style={styles.eventValue}>{props.data.event_name}</Text>
          </View>
          <View style={styles.eventDetailsContainer}>
            <Text
              style={[styles.eventDetails, {color: props.theme.theme_colour}]}>
              Venue:
            </Text>
            <Text style={[styles.eventValue, styles.eventValue2]}>{props.data.event_venue}</Text>
          </View>
          <View style={[GeneralStyles.flexRow]}>
            <View
              style={[
                styles.eventDetailsContainer,
                styles.eventDetailsContainer2,
              ]}>
              <Text
                style={[
                  styles.eventDetails,
                  {color: props.theme.theme_colour},
                ]}>
                Tickets:
              </Text>
              <Text style={styles.eventValue}>{props.data.no_of_members}</Text>
            </View>
            <View style={styles.eventDetailsContainer}>
              <Text
                style={[
                  styles.eventDetails,
                  {color: props.theme.theme_colour},
                ]}>
                Total amount:
              </Text>
              <Text style={styles.eventValue}>{props.data.amount}</Text>
            </View>
          </View>
          <View style={styles.miniContainer}>
            <View
              style={[
                styles.eventDetailsContainer,
                styles.eventDetailsContainer2,
                GeneralStyles.noMarginTop,
              ]}>
              <Text
                style={[
                  styles.eventDetails,
                  {color: props.theme.theme_colour},
                ]}>
                Ticket Price:
              </Text>
              <Text style={styles.eventValue}>{props.data.rate}</Text>
            </View>
            <View style={styles.dateTimeContainer}>
              <Text
                style={[
                  styles.eventDetails,
                  {color: props.theme.theme_colour},
                ]}>
                Date & Time:
              </Text>
              <DateTimeBadge
                date={props.data.from_date}
                time={props.data.event_time}
              />
            </View>
          </View>
          <View style={styles.bgImageContainer}>
            <Image
              source={{
                uri: constants.RESTAURANT_LOGO_PATH + props.data.event_image,
              }}
              resizeMode="cover"
              style={styles.bgImage}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const mapStateToProps = store => ({
  theme: store.theme.appTheme,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(EventListContainer));
