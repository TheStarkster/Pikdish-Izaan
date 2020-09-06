import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

import style from './style';
import api from '../../../../config/api';
import Loader from '../../../../components/Loader';
import ErrorBox from '../../../../components/ErrorBox';
import selectedRestaurantActions from '../../../../redux/selectedRestaurant/action';
import Button from '../Button';
import colors from '../../../../config/colors';
import constants from '../../../../config/constants';

function Body(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handlePress(orderType) {
    const departments = props.data.departments;

    try {
      let departId = Array.isArray(departments)
        ? props.data.departments[0].id
        : '0';

      if (orderType === constants.PRE_ORDER_TYPE) {
        setIsLoading(true);

        const payload = {restaurant_id: props.data.id};

        const response = await api.restroDepartmentKeyPair(payload);

        if (response.list.length > 1) {
          setIsLoading(false);

          props.setSelectedOrderType(orderType);

          return props.navigation.navigate('SelectDepartment', {
            restaurant: {...props.data, departments: response.list},
          });
        }

        departId = response.list[0].id;
      }

      props.setSelectedOrderType(orderType);

      props.setSelectedRestaurant({
        ...props.data,
        restaurant_id: props.data.id,
        dept_id: departId,
      });

      if (props.data.restaurant_type === constants.FOOD_COURT_TYPE) {
        props.navigation.navigate('FoodCourt');
      } else {
        props.navigation.navigate('RestaurantItems');
      }
    } catch (e) {
      setErrorMessage(e.message);
    }

    setIsLoading(false);
  }

  const features = props.data.pikdish_feature.split(',');

  return (
    <View style={style.container}>
      {features.includes('2') && (
        <Button
          onPress={() => handlePress(constants.PRE_ORDER_TYPE)}
          containerStyles={style.button}>
          Pre-Order
        </Button>
      )}
      {features.includes('3') && (
        <Button
          onPress={() => handlePress(constants.TAKE_AWAY_TYPE)}
          containerStyles={style.button}>
          Take Away
        </Button>
      )}
      {features.includes('1') && (
        <Button
          onPress={() => handlePress(constants.DELIVERY_TYPE)}
          containerStyles={style.button}>
          Delivery
        </Button>
      )}
      {isLoading && <Loader />}
      <ErrorBox onClose={() => setErrorMessage('')} message={errorMessage} />
    </View>
  );
}

const mapStateToProps = store => ({});

const mapDispatchToProps = {
  setSelectedRestaurant: selectedRestaurantActions.setSelectedRestaurant,
  setSelectedOrderType: selectedRestaurantActions.setSelectedOrderType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Body));
