import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AreaChart, Grid, YAxis, XAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

import GeneralStyle from '../../GeneralStyle';
import colors from '../../../config/colors';
import constants from '../../../config/constants';

function AreaGraph() {
  const data = [50, 40, 20, 50, 40, 22, 85, 91, 35, 53, 53, 24, 50, 20, 80];
  const months = [
    'April 01',
    'April 02',
    'April 03',
    'April 04',
    'April 05',
    'April 06',
    'April 07',
  ];

  return (
    <View style={GeneralStyle.flexRow}>
      <YAxis
        data={data}
        style={{paddingRight: 10}}
        contentInset={{top: 30, bottom: 30}}
        svg={{
          fill: 'black',
          fontSize: style.fontSmall.fontSize,
        }}
        numberOfTicks={10}
      />
      <View style={{flex: 1, marginTop: -5}}>
        <AreaChart
          style={{height: 200}}
          data={data}
          animate={true}
          contentInset={{top: 30, bottom: 30}}
          curve={shape.curveNatural}
          svg={{fill: colors.AREA_CHART_COLOR}}>
          <Grid belowChart={false} />
        </AreaChart>
        <XAxis
          data={months}
          formatLabel={(value, index) => {
            return 'April 15';
          }}
          contentInset={{top: 10, left: 20, right: 20}}
          svg={{
            fontSize: style.fontSmall.fontSize,
            fill: 'grey',
            rotation: 0,
            translateX: 0,
            translateY: 5,
          }}
        />
      </View>
    </View>
  );
}

export default AreaGraph;

const style = StyleSheet.create({
  fontSmall: {
    fontSize: constants.WINDOW_WIDTH * 0.03,
  },
});
