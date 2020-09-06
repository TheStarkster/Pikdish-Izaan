import React, {Component} from 'react';
import styles from './style';
import {Text, View, ScrollView} from 'react-native';
import BlankOrderIndication from '../../components/BlankOrderIndication';
import {connect} from 'react-redux';

import api from '../../config/api';
import ErrorBox from '../../components/ErrorBox';
import Loader from '../../components/Loader';
import GeneralStyle from '../GeneralStyle';
import CategoryAccordion2 from '../../components/CategoryAccordion2';
import Header from './Header';
import Body from './Body';
import Header2 from '../../components/Header';

class OrderHistory extends Component {
  state = {
    current: '',
    isLoading: false,
    errorMessage: '',
    orders: [],
  };

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = async () => {
    const {theme, user} = this.props;

    try {
      this.setState({isLoading: true});

      const payload = {
        order_by: '1',
        user_id: user.id,
        is_order_complete: '1',
        restaurant_id: '',
        main_restaurant_id: theme.restaurant_id,
      };

      const response = await api.userAllOrders(payload);

      const orders = [];

      if (Array.isArray(response.data)) {
        response.data.map(item => {
          if (!item.OrderH.length) return;

          item.OrderH.map(data => {
            orders.push({...data, restaurant_id: item.restaurant_id});
          });
        });
      }

      this.setState({orders: orders, data: response.data});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  render() {
    const {isLoading, errorMessage, orders, current} = this.state;

    return (
      <View style={GeneralStyle.flex1}>
        <Header2> Order History </Header2>
        <ScrollView contentContainerStyle={GeneralStyle.flexGrow1}>
          <View style={[styles.container]}>
            {orders.length ? (
              <View style={styles.orderContainer}>
                {orders.map((item, i) => (
                  <CategoryAccordion2
                    key={i}
                    duration={500}
                    containerStyles={styles.categoryContainerStyles}
                    onPress={() => this.setState({current: i})}
                    collapsed={current !== i}
                    header={<Header data={item} />}>
                    <Body data={item} />
                  </CategoryAccordion2>
                ))}
              </View>
            ) : (
              !isLoading && (
                <BlankOrderIndication
                  icon={require('../../assets/images/no-order-history.jpg')}
                  onPress={() => this.props.navigation.navigate('Home')}
                />
              )
            )}
          </View>
        </ScrollView>
        {isLoading && <Loader />}
        <ErrorBox
          message={errorMessage}
          onClose={() => this.setState({errorMessage: ''})}
        />
      </View>
    );
  }
}

const mapStateToProps = store => ({
  theme: store.theme.appTheme,
  user: store.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
