import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styles from './style';

import Header from '../../components/Header';
import GeneralStyles from '../GeneralStyle';
import Stats from './Stats';
import PopularItems from './PopularItems';
import CancelledItems from './CancelledItems';
import Sales from './Sales';

class Dashboard extends Component {
  state = {
    activeTab: 'statsTab',
  };

  switchTab(activeTab) {
    this.setState({activeTab});
  }

  handleBackPress = () => {
    const isFirstRoute = this.props.navigation.isFirstRouteInParent();

    if (isFirstRoute) {
      return this.props.navigation.navigate('Account');
    }

    this.props.navigation.goBack(null);
  };

  render() {
    const {activeTab} = this.state;
    return (
      <View>
        <StatusBar
          networkActivityIndicatorVisible={true}
          backgroundColor="white"
          barStyle="dark-content"
          translucent={false}
        />
        <Header onBackPress={this.handleBackPress}> Dashboard </Header>
        <View style={styles.dashboardContainer}>
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View
                style={[
                  GeneralStyles.container,
                  styles.tabBar,
                  {paddingBottom: 0},
                ]}>
                <TouchableOpacity onPress={() => this.switchTab('statsTab')}>
                  <Text
                    style={[
                      styles.tabBarText,
                      activeTab === 'statsTab' && styles.borderLine,
                    ]}>
                    STATS
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.switchTab('sales')}>
                  <Text
                    style={[
                      styles.tabBarText,
                      activeTab === 'sales' && styles.borderLine,
                    ]}>
                    SALES
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.switchTab('popularItemTab')}>
                  <Text
                    style={[
                      styles.tabBarText,
                      activeTab === 'popularItemTab' && styles.borderLine,
                    ]}>
                    MOST POPULAR ITEMS
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.switchTab('cancelledItemTab')}>
                  <Text
                    style={[
                      styles.tabBarText,
                      activeTab === 'cancelledItemTab' && styles.borderLine,
                    ]}>
                    MOST CANCELLED
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            {activeTab === 'statsTab' && <Stats />}
            {activeTab === 'popularItemTab' && <PopularItems />}
            {activeTab === 'cancelledItemTab' && <CancelledItems />}
            {activeTab === 'sales' && <Sales />}
          </View>
        </View>
      </View>
    );
  }
}

export default Dashboard;
