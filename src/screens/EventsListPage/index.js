import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {connect} from 'react-redux';

import api from '../../config/api';
import styles from './style';
import GeneralStyles from '../GeneralStyle';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import EventListContainer from './EventListContainer';

class EventsListPage extends Component {
  state = {
    events: [],
    isLoading: false,
    errorMessage: '',
  };

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents = async () => {
    const {user} = this.props;

    try {
      this.setState({isLoading: true});

      const payload = {user_id: user.id};

      const response = await api.getUserEventList(payload);

    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  render() {
    const {isLoading, errorMessage, events} = this.state;

    return (
      <View style={GeneralStyles.flex1}>
        <Header>Event Book</Header>
        <ScrollView>
          <View style={styles.container}>
            {events.map(item => (
              <EventListContainer />
            ))}
            <EventListContainer />
            <EventListContainer />
            <EventListContainer />
          </View>
        </ScrollView>
        {isLoading && <Loader />}
        <ErrorBox
          message={errorMessage}
          onClose={() => this.setState({errorMessage: ''})}
        />
      </View>
    );
  }
}

const mapStateToProps = store => ({
  user: store.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EventsListPage);
