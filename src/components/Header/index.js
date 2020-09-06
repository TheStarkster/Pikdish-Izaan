import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Item, Input } from 'native-base';

import style from './style';

const Header = props => {
  const [heartActive, setHeartActive] = useState(props.heartActive);

  useEffect(() => {
    setHeartActive(props.heartActive);
  }, [props.heartActive]);

  function goBack() {
    if (props.onBackPress) {
      return props.onBackPress();
    }

    props.navigation.goBack(null);
  }

  function toggleHeart(value) {
    if (props.onHeartClick) return props.onHeartClick(value);

    setHeartActive(value);
  }

  function renderLocation() {
    if (props.location) {
      return (
        <TouchableOpacity onPress={props.onLocationClick}>
          <View style={style.headerContent}>
            <Text numberOfLines={1} style={style.locationText}>
              {props.location}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={props.onLocationClick}>
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
  }

  return (
    <SafeAreaView>

      <View style={[style.header, props.headerStyles]}>
        <TouchableOpacity onPress={goBack}>
          <View style={style.iconContainer}>
            <Image
              style={style.icon}
              resizeMode="contain"
              source={require('../../assets/icon/back.png')}
            />
          </View>
        </TouchableOpacity>
        {props.showLocationButton && renderLocation()}
        <Text style={style.screenName}>{props.children}</Text>
        {props.isIcons && (
          <View style={style.rightIconContainer}>
            {props.showHeart &&
              (heartActive ? (
                <TouchableOpacity onPress={() => toggleHeart(false)}>
                  <Image
                    resizeMode="contain"
                    style={style.rightIcon}
                    source={require('../../assets/icon/fav-active.png')}
                  />
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity onPress={() => toggleHeart(true)}>
                    <Image
                      resizeMode="contain"
                      style={style.rightIcon}
                      source={require('../../assets/icon/fav.png')}
                    />
                  </TouchableOpacity>
                ))}
            <TouchableOpacity onPress={props.onSearchPress}>
              <Image
                resizeMode="contain"
                style={style.rightIcon}
                source={require('../../assets/icon/search.png')}
              />
            </TouchableOpacity>
          </View>
        )}
        {props.hasSearchBar && (
          <Item style={style.headerSearchBar}>
            <Input style={{ marginTop: 0 }} placeholder="Enter dish name..." />
          </Item>
        )}
      </View>
    </SafeAreaView>
  );
};

Header.defaultProps = {
  onLocationClick: function () { },
  showHeart: true,
};

const mapStateToProps = state => ({ location: state.auth.location });

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Header));
