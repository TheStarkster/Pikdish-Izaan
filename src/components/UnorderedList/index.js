import React from 'react';
import {View, Text, Image} from 'react-native';

import GeneralStyle from '../../screens/GeneralStyle';
import style from './style';

const UnorderedList = () => (
  <View>
    <View style={style.container}>
      <View style={style.imageContainer}>
        <Image
          style={style.image}
          source={require('../../assets/icon/dot.png')}
        />
      </View>
      <View>
        <Text style={style.heading}>Heading 1</Text>
      </View>
    </View>
    <View style={style.paragraphContainer}>
      <Text style={style.paragraph}>
        Some Random text Some Random text Some Random text Some Random text Some
        Random text Some Random text Some Random text Some Random text Some
        Random text Some Random text Some Random text Some Random text{' '}
      </Text>
    </View>
  </View>
);

export default UnorderedList;
