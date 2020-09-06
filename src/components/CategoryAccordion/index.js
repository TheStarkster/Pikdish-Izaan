import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Accordion, Icon} from 'native-base';

import ItemList from '../../components/ItemList';
import style from './style';
import GeneralStyle from '../../screens/GeneralStyle';

const dataArray = [
  {
    title: 'First Element',
    amount: "11 items: 6'' American Pizza and More...",
    content: 'Lorem ipsum dolor sit amet',
  },
  {
    title: 'Second Element',
    amount: '11 items',
    content: 'Lorem ipsum dolor sit amet',
  },
  {
    title: 'Third Element',
    amount: '10 items',
    content: 'Lorem ipsum dolor sit amet',
  },
];

class CategoryAccordion extends Component {
  constructor() {
    super();

    this._renderHeader = this._renderHeader.bind(this);
  }

  _renderHeader(item) {
    if (this.props.children && item.title === 'First Element')
      return this.props.children;
    if (this.props.children) return;

    return (
      <View style={style.header}>
        <View style={GeneralStyle.flex1}>
          <Text style={style.title}> {item.title}</Text>
          <Text
            style={[style.amount, GeneralStyle.flex1, GeneralStyle.flexWrap]}>
            {item.amount}
          </Text>
        </View>
        <Image
          source={require('../../assets/icon/down.png')}
          style={style.downArrow}
        />
      </View>
    );
  }

  _renderContent(item) {
    return (
      <View>
        <ItemList />
        <ItemList />
        <ItemList />
      </View>
    );
  }

  render() {
    const expanded = this.props.expanded === 0 ? this.props.expanded : true;

    return (
      <Accordion
        dataArray={dataArray}
        style={{borderWidth: 0}}
        animation={true}
        expanded={expanded}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
    );
  }
}

export default CategoryAccordion;
