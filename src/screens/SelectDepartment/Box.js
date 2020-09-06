import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import BlankBox from './BlankBox';
import selectedRestaurantActions from '../../redux/selectedRestaurant/action';
import constants from '../../config/constants';
import colors from '../../config/colors';

function Box(props) {
  function navigate() {
    props.setSelectedRestaurant({
      ...props.restaurant,
      restaurant_id: props.restaurant.id,
      dept_id: props.data.id,
    });

    props.navigation.navigate('RestaurantItems');
  }

  return (
    <TouchableOpacity onPress={navigate} style={style.container}>
      {props.dept_image ? (
        <>
          <Image
            style={style.image}
            source={{uri: constants.RESTAURANT_LOGO_PATH + props.dept_image}}
          />
          <View
            style={[
              style.nameContainer,
              {backgroundColor: props.theme.theme_colour},
            ]}>
            <Text style={style.name}>{props.data.dept_name}</Text>
          </View>
        </>
      ) : (
        <BlankBox data={props.data} />
      )}
      {/* {props.dept_image ? (
        <Image
          style={style.image}
          source={{uri: constants.RESTAURANT_LOGO_PATH + props.dept_image}}
        />
      ) : (
        <View style={[style.image, {backgroundColor: colors.WHITE}]}></View>
      )}
      <View
        style={[
          style.nameContainer,
          {backgroundColor: props.theme.theme_colour},
        ]}>
        <Text style={style.name}>{props.data.dept_name}</Text>
      </View> */}
    </TouchableOpacity>
  );
}

Box.defaultProps = {
  data: {
    url:
      'https://www.perfectdailygrind.com/wp-content/uploads/2019/07/Coffeeshop-Tips-01.jpg',
  },
};

const mapStateToProps = store => ({
  theme: store.theme.appTheme,
});

const mapDispatchToProps = {
  setSelectedRestaurant: selectedRestaurantActions.setSelectedRestaurant,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Box));

const style = StyleSheet.create({
  container: {
    width: '48.5%',
    height: constants.WINDOW_WIDTH * 0.32 + 40,
    marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.5,
  },
  image: {
    width: '100%',
    height: constants.WINDOW_WIDTH * 0.32,
  },
  nameContainer: {
    backgroundColor: 'red',
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  name: {
    fontSize: constants.FONT_SMALL,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
    color: colors.WHITE,
  },
});
