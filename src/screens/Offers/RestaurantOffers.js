import React, {Component} from 'react';
import {Text, View, ScrollView, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import constants from "../../config/constants"
import ItemListButtons from './components/ItemListButtons';
import CategoryAccordion2 from '../../components/CategoryAccordion2';
import api from '../../config/api';
import ItemList from './ItemList';
import GeneralStyles from '../GeneralStyle';

class RestaurantOffers extends Component {
  state = {
    current: '',
  };

  render() {
    const {offers} = this.props;
    const {current} = this.state;

    return (
      <>
        <ScrollView contentContainerStyle={GeneralStyles.flexGrow1}>
          <View style={[GeneralStyles.mediumMarginTop, {marginBottom: 20}]}>
            <FlatList
              data={offers}
              renderItem={item => (
                <CategoryAccordion2
                  key={item.item.id}
                  containerStyles={style.accordionContainer}
                  duration={500}
                  // this.setState({current: item.id})
                  onPress={() =>this.setState({current: item.item.id})}
                  collapsed={current !== item.item.id}
                  header={<ItemList index={item.index} data={item.item} />}>
                  <ItemListButtons data={item} />
                </CategoryAccordion2>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>
      </>
    );
  }
}

RestaurantOffers.defaultProps = {
  offers: [],
};

export default RestaurantOffers;

const style = StyleSheet.create({
  accordionContainer: {
    ...GeneralStyles.boxShadow,
    marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.5,

    backgroundColor: 'white',
    // borderWidth: 0.5,
    // borderColor: colors.LIGHT_BLACK
  },
});
