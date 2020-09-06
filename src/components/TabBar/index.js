import React, {useEffect} from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';

import style from './style';
import GeneralStyle from '../../screens/GeneralStyle';

function TabBar(props) {
  useEffect(navigateToOrders, []);

  function navigateToOrders() {
    if (props.navigation.state && props.navigation.state.params) {
      const orders = props.navigation.state.params.orders;

      if (orders && orders.length) {
        navigate('Orders');
      }
    }
  }

  function navigate(route) {
    props.navigation.navigate(route);
  }

  const index = props.navigation.state.index;

  return (
    <View style={style.container}>
      <Tab
        activeColor={props.theme.theme_colour}
        active={index === 0}
        onPress={() => navigate('Home')}
        source={require('../../assets/icon/home.png')}
        activeSource={require('../../assets/icon/home-active.png')}
        label="Home"
      />
      <Tab
        activeColor={props.theme.theme_colour}
        active={index === 1}
        onPress={() => navigate('Orders')}
        source={require('../../assets/icon/orders.png')}
        activeSource={require('../../assets/icon/orders-active.png')}
        label="Orders"
      />
      <Tab
        activeColor={props.theme.theme_colour}
        active={index === 2}
        onPress={() => navigate('Explore')}
        source={require('../../assets/icon/explore.png')}
        activeSource={require('../../assets/icon/explore-active.png')}
        label="Explore"
      />
      <Tab
        activeColor={props.theme.theme_colour}
        active={index === 3}
        onPress={() => navigate('Account')}
        source={require('../../assets/icon/account.png')}
        activeSource={require('../../assets/icon/account-active.png')}
        label="Account"
      />
    </View>
  );
}

const mapStateToProps = store => ({
  theme: store.theme.appTheme,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);

function Tab(props) {
  const image = props.active ? props.activeSource : props.source;

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={[GeneralStyle.flex1, GeneralStyle.alignCenter]}>
        <Image resizeMode="contain" style={style.icon} source={image} />
        <Text
          allowFontScaling={false}
          style={[
            style.label,
            props.active && style.activeLabel,
            props.active && {color: props.activeColor},
          ]}>
          {props.label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
