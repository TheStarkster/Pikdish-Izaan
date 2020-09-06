import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';

import constants from '../../config/constants';
import GeneralStyle from '../GeneralStyle';
import ColoredCircle from '../../components/ColoredCircle';
import colors from '../../config/colors';

const DishHeader = props => (
  <View style={[style.container, props.containerStyle]}>
    <View style={GeneralStyle.flex1}>
      <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
        <ColoredCircle />
        <Text style={style.restaurantName}>Jodhpur Dabbawala</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('RestaurantItems')}>
          <Text style={style.menuLink}>View Menu</Text>
        </TouchableOpacity>
      </View>
      <View style={style.detailsContainer}>
        <Text style={style.type}>Sandwiches</Text>
        <Text style={style.noOfItems}>2 Items</Text>
      </View>
    </View>
    <View style={style.rightContainer}>
      <Image
        resizeMode="contain"
        style={style.downArrow}
        source={require('../../assets/icon/down.png')}
      />
    </View>
  </View>
);

export default withNavigation(DishHeader);

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.GREY,
    borderBottomWidth: 1,
    paddingBottom: constants.PADDING_VERTICAL_MEDIUM,
    marginVertical: constants.MARGIN_VERTICAL_XSMALL,
  },
  menuLink: {
    textAlign: 'right',
    fontSize: constants.FONT_X_SMALL,
    color: colors.RED,
    left: constants.WINDOW_WIDTH * 0.05,
  },
  restaurantName: {
    marginLeft: constants.MARGIN_SMALL,
    fontFamily: 'Nunito-Bold',
    fontSize: constants.FONT_SMALL,
    flex: 1,
  },
  detailsContainer: {
    marginLeft: constants.MARGIN_SMALL,
  },
  type: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
  noOfItems: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL,
  },
  rightContainer: {
    marginRight: constants.MARGIN_SMALL,
  },
  downArrow: {
    width: constants.WINDOW_WIDTH * 0.04,
    height: constants.WINDOW_WIDTH * 0.04,
  },
});
