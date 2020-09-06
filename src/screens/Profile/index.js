import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import Dash from 'react-native-dash';

import cartAction from '../../redux/cart/action';
import authAction from '../../redux/auth/action';
import UnauthenticatedView from './UnauthenticatedView';
import helpers from '../../config/helpers';
import List from './List';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import GeneralStyle from '../GeneralStyle';
import style from './style';
import colors from '../../config/colors';
import {connect} from 'react-redux';

class Profile extends Component {
  copy = text => {
    helpers.copy(text);
  };

  logout = () => {
    this.props.clearCart();
    this.props.removeUser();

    this.props.navigation.dispatch(helpers.getStackReseter('AppDescription'));
  };

  checkUserCondition = () => {
    const {user} = this.props;
    const types = ['0', '1', '5'];

    return !types.includes(user.user_type);
  };

  renderMenu = () => {
    if (!this.checkUserCondition()) return;
    const {user} = this.props;
    const type = user.user_type;

    if (type === '3') {
      return (
        <List
          icons={true}
          onPress={() => this.props.navigation.navigate('TableBookingPage')}
          label="Take Order"
          leftIcon={require('../../assets/icon/dashboard.png')}
        />
      );
    }

    if (type === '2' || type === '4') {
      return (
        <>
          <List
            icons={true}
            onPress={() => {
              return this.props.navigation.navigate('Dashboard');
            }}
            label="Dashboard"
            leftIcon={require('../../assets/icon/dashboard.png')}
          />
          <List
            icons={true}
            onPress={() => this.props.navigation.navigate('TableBookingPage')}
            label="Take Order"
            leftIcon={require('../../assets/icon/dashboard.png')}
          />
        </>
      );
    }
  };

  render() {
    const {theme, user} = this.props;

    const pic = user && (user.profilePic ? user.profilePic : user.defaultPic);

    return (
      <View style={GeneralStyle.flex1}>
        <Header>Account</Header>
        <ScrollView
          style={[GeneralStyle.flex1, GeneralStyle.backgroundLightGrey]}>
          {user ? (
            <View style={[GeneralStyle.container, style.container]}>
              <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
                <View>
                  <Avatar source={{uri: pic}} style={style.avatar} />
                </View>
                <View style={style.avatarSiblingContainer}>
                  <Text style={style.username}>{user.name}</Text>
                  <Text style={style.mobileNo}>{user.mobile_no}</Text>
                  <View style={[GeneralStyle.flexRow]}>
                    <Text style={style.mobileNo}>Referral Code: </Text>
                    <TouchableOpacity onPress={() => this.copy('REF1001')}>
                      <Text
                        style={[style.mobileNo, {color: theme.theme_colour}]}>
                        {user.refferral_code}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={style.listContainer}>
                <List
                  onPress={() => this.props.navigation.navigate('EditProfile')}
                  icons={true}
                  label="Edit Profile"
                  leftIcon={require('../../assets/icon/edit-icon.png')}
                />
                <List
                  onPress={() => this.props.navigation.navigate('ChangePin')}
                  icons={true}
                  label="Change PIN"
                  leftIcon={require('../../assets/icon/edit-icon.png')}
                />
                <List
                  onPress={() => this.props.navigation.navigate('OrderHistory')}
                  icons={true}
                  label="Order History"
                  leftIcon={require('../../assets/icon/your-order.png')}
                />
                <List
                  onPress={() =>
                    this.props.navigation.navigate('FavouriteRestaurants')
                  }
                  icons={true}
                  label="Favourite Restaurant"
                  isNew={false}
                  leftIcon={require('../../assets/icon/fav-restaurant.png')}
                />
                <List
                  icons={true}
                  onPress={() => this.props.navigation.navigate('YourEvents')}
                  label="Your Events"
                  leftIcon={require('../../assets/icon/your-event.png')}
                />
                {/* <List
                icons={true}
                label="Wallet"
                leftIcon={require('../../assets/icon/wallet.png')}
              /> */}
                <List
                  onPress={() => this.props.navigation.navigate('Wallet')}
                  icons={true}
                  label="Wallet"
                  leftIcon={require('../../assets/icon/wallet.png')}
                />
                {this.renderMenu()}
                {/* <List
                  icons={true}
                  onPress={() => {
                    if (this.checkUserCondition())
                      return this.props.navigation.navigate('Dashboard');

                    this.props.navigation.navigate('TableBookingPage', {
                      fromAccount: true,
                    });
                  }}
                  label="Dashboard"
                  leftIcon={require('../../assets/icon/dashboard.png')}
                /> */}
                {/* {this.checkUserCondition() && (
                  <List
                    icons={true}
                    onPress={() =>
                      this.props.navigation.navigate('TableBookingPage')
                    }
                    label="Take Order"
                    leftIcon={require('../../assets/icon/dashboard.png')}
                  />
                )} */}
              </View>
              <View style={style.listContainerSecond}>
                <Dash dashColor={colors.GREY} style={style.dashedTopBorder} />
                <List
                  onPress={() => this.props.navigation.navigate('AppFeedback')}
                  label="Send Feedback"
                />
                <List label="Rate us on Play/App Store" />
                <List
                  onPress={() =>
                    this.props.navigation.navigate('TermsCondition', {
                      privacyPolicy: true,
                    })
                  }
                  label="Privacy Policy"
                />
                <List
                  onPress={() =>
                    this.props.navigation.navigate('TermsCondition')
                  }
                  label="Terms of Service"
                />
                <List
                  onPress={() => this.props.navigation.navigate('ContactUs')}
                  label="Contact Us"
                />
                {/* <View style={style.dashedBorder}></View> */}
                <Dash dashColor={colors.GREY} style={style.dashedBorder} />
              </View>
              <View style={style.buttonContainer}>
                <Button onPress={this.logout} buttonStyles={style.button}>
                  Sign out
                </Button>
              </View>
              <Text style={style.version}>Version 4.2.1</Text>
            </View>
          ) : (
            <UnauthenticatedView />
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = store => ({
  theme: store.theme.appTheme,
  user: store.auth.user,
});

const mapDispatchToProps = {
  removeUser: authAction.removeUser,
  clearCart: cartAction.clearCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
