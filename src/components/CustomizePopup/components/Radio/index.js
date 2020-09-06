import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import style from './style';
import RadioButton from '../../../RadioButton';

function Radio(props) {
  const [selected, setSelected] = useState(props.selected);

  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  return (
    <View style={style.container}>
      <RadioButton
        onSelect={() => props.onChange(props.id)}
        style={style.radioContainer}
        selected={selected}
        label={props.children}
      />
      {!!props.price && <Text style={style.amount}>₹{props.price}</Text>}
    </View>
  );
}

export default Radio;
