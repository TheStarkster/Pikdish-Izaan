import React from 'react';
import {Switch as NativeSwitch} from 'react-native-switch';

import style from "./style";
import colors from '../../config/colors';

const Switch = props => (
  <NativeSwitch
    value={props.value}
    onValueChange={props.onValueChange}
    disabled={false}
    activeText={'On'}
    inActiveText={'Off'}
    circleSize={20}
    barHeight={20}
    circleBorderWidth={1}
    backgroundActive={colors.VEG_GREEN}
    backgroundInactive={colors.GREY}
    circleActiveColor="white"
    circleInActiveColor="white"
    changeValueImmediately={true}
    changeValueImmediately={true}
    innerCircleStyle={style.innerCircleStyle}
    switchLeftPx={2}
    switchRightPx={2}
    switchWidthMultiplier={1.5}
  />
);

export default Switch;
