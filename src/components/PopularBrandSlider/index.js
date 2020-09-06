import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {withNavigation} from 'react-navigation';

import style from './style';
import Item from './Item';
import GeneralStyle from '../../screens/GeneralStyle';

function PopularBrandSlider(props) {
  return (
    <View style={style.container}>
      <Text style={style.heading}>{props.heading}</Text>
      <ScrollView
        contentContainerStyle={GeneralStyle.flexGrow1}
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
        <View style={[GeneralStyle.flexRow, GeneralStyle.flex1]}>
          {props.data.map((item, i) => (
            <Item
              key={i}
              type={props.type}
              data={item}
              containerStyle={{marginLeft: 0}}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default withNavigation(PopularBrandSlider);
