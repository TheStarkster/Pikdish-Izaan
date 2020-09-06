import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import ItemListButtons from "./components/ItemListButtons"
import CategoryAccordion2 from '../../components/CategoryAccordion2';
import ItemList from '../../components/ItemList';
import constants from '../../config/constants';
import colors from '../../config/colors';

const Dishes = props => {
  const [current, setCurrent] = useState(0);

  return (
    <View style={style.container}>
      {props.data.map((item, index) => (
        <CategoryAccordion2
          key={item.id}
          containerStyles={style.accordionContainer}
          duration={500}
          onPress={() => setCurrent(item.id)}
          collapsed={current !== item.id}
          header={<ItemList key={index} data={item} />}>
          <ItemListButtons data={item} />
        </CategoryAccordion2>
      ))}
    </View>
  );
};

export default Dishes;

const style = StyleSheet.create({
  container: {
    marginTop: constants.MARGIN_VERTICAL_SMALL,
  },
  itemContainer: {
    marginHorizontal: constants.PADDING_SMALL * 0.7,
    borderColor: colors.GREY,
    borderBottomWidth: 1,
  },
});
