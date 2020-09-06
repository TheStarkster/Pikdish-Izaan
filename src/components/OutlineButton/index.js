import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';

import style from './style';
import GeneralStyle from '../../screens/GeneralStyle';
import constants from '../../config/constants';

const OutlineButton = props => {  
  function renderCustomizeContainer() {
    if (!props.showCustomization) return;

    return (
      <TouchableOpacity onPress={props.onCustomizePress}>
        <View style={style.customizedContainer}>
          <Text style={style.customizedText}>CUSTOMIZED</Text>
          <Image
            resizeMode="contain"
            style={style.arrowDownIcon}
            source={require('../../assets/icon/arrow-bottom-red.png')}
          />
        </View>
      </TouchableOpacity>
    );
  }

  if (!props.customizable) {
    return (
      <View style={[GeneralStyle.flex1, props.containerStyles]}>
        <TouchableOpacity
          onPress={props.onPress}
          style={[style.button, props.buttonStyles]}>
          <Text style={style.buttonText}>{props.children}</Text>
        </TouchableOpacity>
        {renderCustomizeContainer()}
      </View>
    );
  } else {
    return (
      <View style={[GeneralStyle.flex1, props.containerStyles]}>
        <View style={[style.button, props.buttonStyles]}>
          <View style={style.container}>
            <TouchableOpacity
              style={[
                GeneralStyle.h100,
                GeneralStyle.flex1,
                GeneralStyle.justifyCenter,
                GeneralStyle.alignCenter,
              ]}
              onPress={props.onSubtract}>
              <Image
                style={style.substractIcon}
                source={require('../../assets/icon/substract.png')}
              />
            </TouchableOpacity>
            <Text style={style.number}>{props.amount}</Text>
            <TouchableOpacity
              style={[
                GeneralStyle.h100,
                GeneralStyle.flex1,
                GeneralStyle.justifyCenter,
                GeneralStyle.alignCenter,
              ]}
              onPress={props.onPlus}>
              <Image
                style={style.substractIcon}
                source={require('../../assets/icon/add.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {renderCustomizeContainer()}
      </View>
    );
  }
};

OutlineButton.defaultProps = {
  onPress: function() {},
  onSubtract: function() {},
  onPlus: function() {},
};

export default OutlineButton;
