import React, {Component} from 'react';
import {View, ScrollView, Image} from 'react-native';
import {connect} from 'react-redux';

import styles from './style';
import GeneralStyles from '../GeneralStyle';
import api from '../../config/api';
import Header from '../../components/Header';
import EventListContainer from './EventListContainer';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import Tab from '../../components/Tab';
import GeneralStyle from '../GeneralStyle';

class YourEvents extends Component {
  state = {
    events: [],
    pastEvents: [],
    liveEvents: [],
    isLoading: false,
    errorMessage: '',
    activeTab: 'live',
  };

  componentDidMount() {
    // this.fetchEvents();
    this.fetchPastEvents();
  }

  changeTab = tab => {
    this.setState({activeTab: tab});

    if (tab === 'live') {
      this.fetchLiveEvents();
    }
    if (tab === 'past') {
      this.fetchPastEvents();
    }
  };

  fetchLiveEvents = async () => {
    const {user} = this.props;
    const {liveEvents} = this.state;

    try {
      if (liveEvents.length) return;

      this.setState({isLoading: true});

      const payload = {user_id: user.id};

      const response = await api.getUserLiveEventList(payload);

      this.setState({liveEvents: response.events});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  fetchPastEvents = async () => {
    const {user} = this.props;
    const {pastEvents} = this.state;

    try {
      if (pastEvents.length) return;

      this.setState({isLoading: true});

      const payload = {user_id: user.id};

      const response = await api.getUserPastEventList(payload);

      this.setState({pastEvents: response.events});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  render() {
    const {
      isLoading,
      errorMessage,
      liveEvents,
      pastEvents,
      activeTab,
    } = this.state;

    const events = activeTab === 'live' ? liveEvents : pastEvents;

    return (
      <View style={GeneralStyles.flex1}>
        <Header>Your Events</Header>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View style={styles.tabContainer}>
              <Tab
                active={activeTab === 'live'}
                onPress={() => this.changeTab('live')}>
                Live Event
              </Tab>
              <Tab
                labelStyles={GeneralStyle.textRight}
                active={activeTab === 'past'}
                onPress={() => this.changeTab('past')}>
                Past Event
              </Tab>
            </View>
            {events.length ? (
              events.map((item, i) => (
                <EventListContainer key={i} tab={activeTab} data={item} />
              ))
            ) : (
              <View
                style={[
                  GeneralStyles.flex1,
                  GeneralStyles.justifyCenter,
                  GeneralStyles.alignCenter,
                ]}>
                <Image source={require('../../assets/icon/no-event.png')} />
              </View>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(YourEvents);
