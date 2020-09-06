import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

import constants from '../../config/constants';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import api from '../../config/api';
import cartActions from '../../redux/cart/action';
import selectedRestaurantActions from '../../redux/selectedRestaurant/action';
import Button from '../FavouriteRestaurants/Button';
import styles from './style';
import ColoredCircle from '../../components/ColoredCircle';

function Body(props) {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function repeatOrder() {
    const restaurant = {...props.data};
    delete restaurant.order_l;

    try {
      const payload = {
        restaurant_id: restaurant.restaurant_id,
        order_type: restaurant.order_type,
        user_id: props.user ? props.user.id : '0',
        cuisine_id: '',
      };

      setLoading(true);

      const response = await api.appRestroDataByID(payload);
      const newRestaurant = response.restro[0] || {};

      setLoading(false);

      props.setCartRestaurant({
        ...newRestaurant,
        restaurant_id: restaurant.restaurant_id,
      });

      props.setSelectedOrderType(props.data.order_type);

      props.setItem(props.data.order_l);

      props.navigation.navigate('ViewCart');
    } catch (e) {
      setLoading(false);
      setErrorMessage(e.message);
    }
  }

  function shouldShowRepeatOrder() {
    return props.data.order_type !== constants.TABLE_ORDER_TYPE;
  }

  return (
    <View>
      <View>
        {props.data.order_l.map((item, i) => (
          <Item key={i} data={item} />
        ))}
      </View>
      <View style={styles.footer}>
        <Button
          containerStyles={styles.button}
          onPress={() => props.navigation.navigate('BillDetails')}>
          Bill Details
        </Button>
        {shouldShowRepeatOrder() && (
          <Button onPress={repeatOrder} containerStyles={styles.button}>
            Repeat Order
          </Button>
        )}
      </View>
      {isLoading && <Loader />}
      <ErrorBox message={errorMessage} onClose={() => setErrorMessage('')} />
    </View>
  );
}

const mapStateToProps = store => ({
  user: store.auth.user,
});

const mapDispatchToProps = {
  setItem: cartActions.setItem,
  setCartRestaurant: cartActions.setCartRestaurant,
  setSelectedOrderType: selectedRestaurantActions.setSelectedOrderType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Body));

function Item(props) {
  return (
    <View style={styles.bodyContainer}>
      <View>
        <View style={styles.miniContainer}>
          <ColoredCircle style={styles.vegIcon} />
          <Text style={styles.itemName}>
            {props.data.item_name} x {props.data.qty}{' '}
          </Text>
        </View>
        <Text style={styles.itemQuantity}>{props.data.qty} Plate</Text>
      </View>
      <Text style={styles.itemAmount}>₹{props.data.total_amount}</Text>
    </View>
  );
}
