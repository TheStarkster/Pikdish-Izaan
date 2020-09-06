import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';

import constants from '../../config/constants';
import RestaurantDetailsHeader from '../../components/RestaurantDetailsHeader';
import Box from './Box';
import Header from '../../components/Header';
import style from './style';
import GeneralStyles from '../GeneralStyle';

export default class SelectDepartment extends Component {
  render() {
    const {restaurant} = this.props.navigation.state.params;

    return (
      <View style={GeneralStyles.flex1}>
        <Header />
        <ScrollView contentContainerStyle={GeneralStyles.flexGrow1}>
          <View style={style.container}>
            <RestaurantDetailsHeader restaurant={restaurant} />
            <View>
              <Text style={style.bookingHeading}>Booking At</Text>
              <View
                style={[
                  GeneralStyles.flexRow,
                  GeneralStyles.flexWrap,
                  GeneralStyles.justifyBetween,
                ]}>
                {restaurant.departments.map(item => (
                  <Box
                    key={Math.random().toString()}
                    restaurant={restaurant}
                    data={item}
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
