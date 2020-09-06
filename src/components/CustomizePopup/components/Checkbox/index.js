import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';

import GeneralStyle from '../../../../screens/GeneralStyle';
import style from './style';

const CheckBox = props => {
  const [checked, setChecked] = useState(props.checked);

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  function handleChange() {
    props.onChange(props.data);
  }

  return (
    <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
      <TouchableOpacity
        style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}
        onPress={handleChange}>
        <View
          style={[
            style.container,
            props.containerStyle,
            checked ? style.selectedBox : style.unSelectedBox,
          ]}>
          <Image
            source={require('../../../../assets/icon/tick.png')}
            style={style.tickIcon}
          />
        </View>

        <Text style={style.label}>{props.label}</Text>
      </TouchableOpacity>
      <Text style={style.amount}>₹{props.price}</Text>
    </View>
  );
};

CheckBox.defaultProps = {
  onChange: function() {},
  value: '',
  checkboxStyle: {},
};
export default CheckBox;
