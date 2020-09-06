import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import style from './style';
import GeneralStyles from '../../screens/GeneralStyle';

class DropdownHeader extends Component {
  navigate(route) {
    this.props.navigation.navigate(route);
  }

  renderLocation = () => {
    if (this.props.location) {
      return (
        <TouchableOpacity onPress={() => this.navigate('SearchLocation')}>
          <View style={style.headerContent}>
            <Text numberOfLines={1} style={style.locationText}>
              {this.props.location}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => this.navigate('SearchLocation')}>
          <View style={style.headerContent}>
            <Text style={style.location}>Location</Text>
            <Image
              style={style.downArrow}
              source={require('../../assets/icon/down.png')}
            />
          </View>
        </TouchableOpacity>
      );
    }
  };

  render() {
    return (
      <SafeAreaView>
        <View style={style.headerMainContainer}>
          {this.renderLocation()}
          <TouchableOpacity onPress={this.navigate.bind(this, 'Offers')}>
            <View style={style.headerContent}>
              <Image
                style={style.discountIcon}
                source={require('../../assets/icon/discount.png')}
              />
              <Text style={GeneralStyles.fontSmall}>Offer</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({ location: state.auth.location });

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(DropdownHeader));
