import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import api from "../../config/api"
import GeneralStyle from '../GeneralStyle';
import CategoryAccordion2 from '../../components/CategoryAccordion2';
import ItemList from './components/ItemList';
import ItemListButtons from './components/ItemListButtons';
import constants from '../../config/constants';

function Restaurants(props) {
  const [current, setCurrent] = useState('');

  async function removeFavRestaurant() {
    const {user} = props;

    try {
      const payload = {user_id: user.id, restaurant_id: id};

      await api.removeRestaurantFromFavList(payload);
    } catch (e) {
      console.log('e =>', e);
    }
  }

  return (
    <View style={style.container}>
      {props.data.map(item => (
        <CategoryAccordion2
          key={item.id}
          containerStyles={style.accordionContainer}
          duration={500}
          onPress={() => setCurrent(item.id)}
          collapsed={current !== item.id}
          header={
            <ItemList
              data={item}
              heartActive={true}
            />
          }>
          <ItemListButtons data={item} />
        </CategoryAccordion2>
      ))}
    </View>
  );
}

Restaurants.defaultProps = {
  data: [],
};

const mapStateToProps = store => ({
  user: store.auth.user,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Restaurants);

const style = StyleSheet.create({
  container: {
    marginTop: constants.MARGIN_MEDIUM,
    paddingHorizontal: constants.PADDING_X_SMALL,
  },
  accordionContainer: {
    ...GeneralStyle.boxShadow,
    marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.5,

    backgroundColor: 'white',
    // borderWidth: 0.5,
    // borderColor: colors.LIGHT_BLACK
  },
});
