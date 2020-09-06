import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';

import GeneralStyle from '../GeneralStyle';
import constants from '../../config/constants';
import colors from '../../config/colors';

function Item(props) {
  function navigate() {
    if (props.onPress) {
      return props.onPress(props.data);
    }

    props.navigation.navigate('Dishes');
  }

  return (
    <TouchableOpacity onPress={navigate} style={GeneralStyle.flex1}>
      <View style={[style.container, props.containerStyles]}>
        <Image
          resizeMode="cover"
          style={style.image}
          source={require('../../assets/images/restaurant-people.png')}
        />
        <View style={style.categoryContainer}>
          <Text style={style.category}>{props.data.category_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

Item.defaultProps = {
  data: {},
};

export default withNavigation(Item);

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: constants.WINDOW_HEIGHT * 0.17,
    width: '100%',
  },
  categoryContainer: {
    backgroundColor: colors.RED,
    paddingVertical: constants.MARGIN_VERTICAL_XSMALL,
  },
  category: {
    textAlign: 'center',
    color: colors.WHITE,
    fontFamily: 'Nunito-Regular',
  },
});
