import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {Bar} from 'react-native-progress';

import style from './style';
import colors from '../../config/colors';
import constants from '../../config/constants';

const RatingBar = props => {
  const [width, setWidth] = useState(null);

  function handleLayoutChange(e) {
    setWidth(e.nativeEvent.layout.width - constants.WINDOW_WIDTH * 0.15);
  }

  return (
    <View onLayout={handleLayoutChange} style={style.container}>
      <Text style={style.ratingPlaceholder}>{props.ratingPlaceholder}</Text>
      <View style={{marginHorizontal: style.ratingStarIcon.marginLeft}}>
        <Icon name="star" size={style.ratingStarIcon.width} />
      </View>
      <Bar color={colors.RED} width={width} progress={props.progress} />
      <Text style={style.rating}>{props.rating}</Text>
    </View>
  );
};

export default RatingBar;
