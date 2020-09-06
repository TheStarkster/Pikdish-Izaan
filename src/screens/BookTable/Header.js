import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import helpers from '../../config/helpers';
import GeneralStyle from '../GeneralStyle';
import constants from '../../config/constants';
import colors from '../../config/colors';
import ColoredCircle from '../../components/ColoredCircle';

function Header(props) {
  return (
    <View style={style.headerContainer}>
      <View style={GeneralStyle.flex1}>
        <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
          <ColoredCircle />
          <View style={style.restaurantDetails}>
            <Text style={style.restaurantName}>
              {props.restaurant.restaurant_name}
            </Text>
          </View>
        </View>
        <View style={style.restaurantDetails2}>
          <Text style={style.restaurantLabel}>
            {helpers.getCuisine(props.restaurant)}
          </Text>
          <View style={style.ratingContainer}>
            <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
              <Image
                style={style.star}
                source={require('../../assets/icon/star.png')}
              />
              <Text style={style.rating}>{props.restaurant.rating}</Text>
              <Text style={style.time}>
                {props.restaurant.preparation_time} mins
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={style.tableContainer}>
        {props.selectedTable && (
          <Text style={style.table}>{props.selectedTable}</Text>
        )}
      </View>
    </View>
  );
}

Header.defaultProps = {
  restaurant: {},
};

export default Header;

const style = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.GREY,
    paddingBottom: constants.MARGIN_VERTICAL_SMALL,
    borderBottomWidth: 1,
  },
  restaurantDetails: {
    justifyContent: 'flex-start',
    marginLeft: constants.MARGIN_X_SMALL * 1.3,
    fontSize: constants.FONT_SMALL,
  },
  restaurantName: {
    fontFamily: 'Nunito-Regular',
  },
  restaurantDetails2: {
    marginLeft: constants.WINDOW_WIDTH * 0.03 + constants.MARGIN_X_SMALL * 1.3,
  },
  restaurantLabel: {
    color: colors.GREY,
    fontSize: constants.FONT_X_SMALL,
    borderColor: colors.GREY,
    paddingBottom: constants.MARGIN_VERTICAL_XSMALL,
    borderBottomWidth: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: constants.MARGIN_VERTICAL_XSMALL * 0.5,
  },
  star: {
    width: constants.WINDOW_WIDTH * 0.035,
    height: constants.WINDOW_WIDTH * 0.035,
  },
  rating: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL,
    marginLeft: constants.MARGIN_X_SMALL,
  },
  time: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL,
    marginLeft: constants.MARGIN_X_SMALL,
  },
  tableContainer: {
    paddingHorizontal: constants.PADDING_SMALL,
    flex: 0.8,
    alignItems: 'flex-end',
  },
  table: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL,
  },
});
