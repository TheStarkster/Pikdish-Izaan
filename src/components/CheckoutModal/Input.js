import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {TextInput} from 'react-native-gesture-handler';

import GlobalInput from '../../components/Input';
import NumberPicker from './NumberPicker';
import GeneralStyle from '../../screens/GeneralStyle';
import constants from '../../config/constants';
import colors from '../../config/colors';

let timePicker;
function Input(props) {
  const [time, settime] = useState(null);

  useEffect(() => {
    if (props.onDateChange && props.value) {
      settime(props.value);
    }
  }, [props.value]);

  function handleTextChange() {}

  return (
    <View style={style.container}>
      <View style={style.labelContainer}>
        <Text style={style.label}>{props.label}</Text>
      </View>

      {props.isNumber ? (
        <View style={[style.inputContainer, style.numberPicker]}>
          <NumberPicker />
        </View>
      ) : (
        <View style={GeneralStyle.flex1}>
          <GlobalInput
            value={props.value}
            label={props.placeholder}
            onChangeText={value => this.handleTextChange('anniversary', value)}
            onFocus={() => {
              timePicker.onPressDate();
              // this.setState({anniversary: ''}, () => {
              // });
            }}
            containerStyles={style.input}
          />
        </View>
      )}

      {!props.isNumber && (
        <DatePicker
          // style={{ flex: 1 }}
          date={time}
          style={style.datePicker}
          ref={el => (timePicker = el)}
          mode="time"
          placeholder="Select time"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          customStyles={{
            dateIcon: style.datePicker,
            dateInput: style.datePicker,
          }}
          onDateChange={time => {
            if (props.handleDateChange) {
              return props.handleDateChange(time);
            }

            settime(time);
          }}
        />
      )}
    </View>
  );
}

Input.defaultProps = {
  handleTextChange: function() {},
};

export default Input;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: constants.MARGIN_VERTICAL_XSMALL * 0.2,
    justifyContent: 'space-between',
  },
  labelContainer: {
    alignSelf: 'center',
    flex: 1,
  },
  label: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_SMALL * 0.9,
    lineHeight: constants.FONT_SMALL_LINE_HEIGHT * 1.3,
  },
  inputContainer: {
    // width: constants.WINDOW_WIDTH * 0.31,
    height: constants.WINDOW_HEIGHT * 0.06,
    borderColor: colors.GREY,
    borderWidth: 1,
    flex: 1,
  },
  numberPicker: {
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  datePicker: {
    width: 0,
    height: 0,
  },
});
