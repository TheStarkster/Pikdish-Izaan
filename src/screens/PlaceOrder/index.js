import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';

import Input from '../../components/Input';
import Header from '../../components/Header';
import Button from '../../components/Button';
import GeneralStyle from '../GeneralStyle';
import style from './style';

class PlaceOrder extends Component {
  state = {
    mobile: '',
  };

  handleChange(type, e) {
    if (type === 'mobile') {
      if (!isNaN(e)) {
        return this.setState({[type]: e});
      }
    } else {
      this.setState({[type]: e});
    }
  }

  render() {
    const {mobile} = this.state;

    return (
      <View style={GeneralStyle.flex1}>
        <Header></Header>
        <ScrollView
          style={[GeneralStyle.flex1, GeneralStyle.backgroundLightGrey]}
          contentContainerStyle={GeneralStyle.flexGrow1}>
          <View style={[style.container]}>
            <View style={style.boxContainer}>
              <Text style={style.heading}>Mobile Number</Text>
              <View style={style.inputContainer}>
                <Input
                  value={mobile}
                  accept="numbers"
                  containerStyle={{width: "80%"}}
                  onChangeText={this.handleChange.bind(this, 'mobile')}
                  keyboardType="number-pad"
                  label="Mobile Number"
                  maxLength={10}
                  prefix="+91"
                />
              </View>
              {/* <TextInput keyboardType="phone-pad" style={style.input} /> */}
              <View style={GeneralStyle.alignCenter}>
                <Button buttonStyles={style.button}>Place Order</Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default PlaceOrder;
