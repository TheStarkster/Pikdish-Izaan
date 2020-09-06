import React from 'react';
import {Text, View, Image, ScrollView} from 'react-native';

import AreaGraph from './AreaGraph';
import GraphHeading from './GraphHeading';
import colors from '../../../config/colors';
import style from './style';
import GeneralStyles from '../../GeneralStyle';

function Sales() {
  return (
    <ScrollView>
      <View style={[style.container]}>
        <View style={style.graphContainer}>
          <GraphHeading>Last Week Sales in Amount</GraphHeading>
          <AreaGraph />
        </View>
        <View style={style.graphContainer}>
          <GraphHeading>Last Week Sales in Amount</GraphHeading>
          <AreaGraph />
        </View>
      </View>
    </ScrollView>
  );
}

export default Sales;
