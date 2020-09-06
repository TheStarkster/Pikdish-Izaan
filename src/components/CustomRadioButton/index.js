import React from 'react';
import styles from './style';
import {Text, View} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

function CustomRadioButton(props) {
  function selectRadio(item) {
    props.onSelect(item);
  }

  return (
    <View>
      <RadioForm
        // formHorizontal={true}
        animation={true}>
        {props.data.map((obj, i) => (
          <RadioButton labelHorizontal={true} key={i} style={styles.container}>
            {/*  You can set RadioButtonLabel before RadioButtonInput */}
            <RadioButtonInput
              obj={obj}
              index={i}
              borderWidth={1}
              buttonInnerColor={'#e74c3c'}
              buttonSize={10}
              buttonOuterSize={20}
              buttonWrapStyle={{marginLeft: 10}}
              isSelected={props.selected === obj.value}
              buttonOuterColor={props.selected === obj.value ? 'red' : 'grey'}
              onPress={() => selectRadio(obj)}
            />
            <RadioButtonLabel
              obj={obj}
              index={i}
              labelHorizontal={true}
              labelStyle={styles.radioLabel}
              labelWrapStyle={{}}
              onPress={() => selectRadio(obj)}
            />
            <Text style={styles.amount}>{obj.thirdValue}</Text>
          </RadioButton>
        ))}
      </RadioForm>
    </View>
  );
}

// class CustomRadioButton extends Component {
//   state = {
//     radioIndex: 0,
//   };

//   selectRadio(i) {
//     this.setState({radioIndex: i}, () => {
//       const {onSelect, data} = this.props;
//       onSelect(data[i]);
//     });
//   }

//   componentDidMount() {
//     const {data} = this.props;
//     const {radioIndex} = this.state;
//     this.props.onSelect(data[radioIndex]);
//   }

//   render() {
//     const {data} = this.props;
//     const {radioIndex} = this.state;

//     return (
//       <View>
//         <RadioForm
//           // formHorizontal={true}
//           animation={true}>
//           {data.map((obj, i) => (
//             <RadioButton
//               labelHorizontal={true}
//               key={i}
//               style={styles.container}>
//               {/*  You can set RadioButtonLabel before RadioButtonInput */}
//               <RadioButtonInput
//                 obj={obj}
//                 index={i}
//                 borderWidth={1}
//                 buttonInnerColor={'#e74c3c'}
//                 buttonSize={10}
//                 buttonOuterSize={20}
//                 buttonWrapStyle={{marginLeft: 10}}
//                 isSelected={radioIndex === i}
//                 buttonOuterColor={radioIndex === i ? 'red' : 'grey'}
//                 onPress={() => this.selectRadio(i)}
//               />
//               <RadioButtonLabel
//                 obj={obj}
//                 index={i}
//                 labelHorizontal={true}
//                 labelStyle={styles.radioLabel}
//                 labelWrapStyle={{}}
//                 onPress={() => this.selectRadio(i)}
//               />
//               <Text style={styles.amount}>{obj.thirdValue}</Text>
//             </RadioButton>
//           ))}
//         </RadioForm>
//       </View>
//     );
//   }
// }

export default CustomRadioButton;
