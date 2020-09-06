import React, {Component} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import styles from './style';

import Header from '../../components/Header';
import DateTimeBadge from '../../components/DateTimeBadge';
import GeneralStyles from '../GeneralStyle';
import OutlineButton from '../../components/OutlineButton';
import Button from '../../components/Button';

class EventDetailPage extends Component {
  state = {
    amount: 1,
  };

  add = () => {
    let {amount} = this.state;
    amount = amount + 1;
    this.setState({amount});
  };

  subtract = () => {
    let {amount} = this.state;

    if (amount > 1) {
      amount = amount - 1;
      this.setState({amount});
    }
  };

  navigate = screen => {
    this.props.navigation.navigate(screen);
  };

  render() {
    const {amount} = this.state;
    const {event} = this.props.navigation.state.params;

    return (
      <View style={GeneralStyles.flex1}>
        <Header />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.mainContainer}>
            <Image
              source={require('../../assets/images/butter-chicken.jpg')}
              style={styles.bgImage}
              resizeMode="cover"
            />
            <View
              style={[
                GeneralStyles.secondContainer,
                styles.bgWhite,
                GeneralStyles.flex1,
              ]}>
              <View style={styles.miniContainer}>
                <View style={[styles.detailContainer, styles.ticketContainer]}>
                  <Text style={styles.detail}>Ticket Price: {event.rate}</Text>
                </View>
                <View style={[styles.detailContainer, styles.seatContainer]}>
                  <Text style={styles.detail}>Seats No:</Text>
                </View>
              </View>
              <View style={styles.dateTimeContainer}>
                <Text style={styles.detail}>Event Date & Time:</Text>
                <DateTimeBadge date={event.from_date} time={event.event_time} />
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.detail}>Venue: {event.event_venue}</Text>
              </View>
              <View style={[styles.detailContainer, styles.bottomBorder]}>
                <Text style={styles.detail}>
                  Description: {event.description}
                </Text>
              </View>
              {/* <View style={styles.bottomContainer}>
                  <View style={[styles.ticketsQuantityContainer]}>
                    <Text style={styles.bottomContainerText}>Tickets:</Text>
                    <OutlineButton
                      customizable
                      containerStyles={styles.outlineButton}
                      amount={amount}
                      onPlus={this.add}
                      onSubtract={this.subtract}
                    />
                  </View>
                  <View style={styles.amountContainer}>
                    <Text style={styles.bottomContainerText}>Amount:</Text>
                    <Text style={styles.bottomContainerText}>
                      ₹{this.state.amount * 200}
                    </Text>
                  </View>
                </View>
                <Button
                  onPress={this.navigate.bind(this, 'PaymentOptions')}
                  buttonStyles={styles.button}>
                  Book Your Seats{' '}
                </Button> */}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default EventDetailPage;
