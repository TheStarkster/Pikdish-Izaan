import React, {Component} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';

import UnorderedList from '../../components/UnorderedList';
import Header from '../../components/Header';
import GeneralStyle from '../GeneralStyle';
import style from './style';

class TermsCondition extends Component {
  navigate(route) {
    this.props.navigation.navigate(route);
  }

  render() {
    const params = this.props.navigation.state.params;
    let routeName = 'Terms & Condition';

    if (params && params.privacyPolicy) {
      routeName = 'Privacy Policy';
    }

    return (
      <View style={GeneralStyle.flex1}>
        <Header>{routeName}</Header>
        <ScrollView>
          <View style={[GeneralStyle.flex1, GeneralStyle.backgroundLightGrey]}>
            {/* <View style={style.container}>
              <Image
                style={style.icon}
                source={require('../../assets/icon/term.png')}
              />
              <Text style={style.mainHeading}>Terms & Condition</Text>
            </View> */}
            <View style={GeneralStyle.smallMarginTop}>
              <UnorderedList />
              <UnorderedList />
              <UnorderedList />
              <UnorderedList />
              <UnorderedList />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default TermsCondition;
