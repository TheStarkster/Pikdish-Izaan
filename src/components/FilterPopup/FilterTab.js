import React from 'react';
import {View} from 'react-native';
import styles from './style';

import constants from '../../config/constants';
import CustomRadioButton from '../CustomRadioButton';

const data = [
  {label: 'My Favourite', value: constants.RESTAURANT_FILTER_CODE.MY_FAV},
  {label: 'Offer Only', value: constants.RESTAURANT_FILTER_CODE.OFFER_ONLY},
  {label: 'Veg', value: constants.RESTAURANT_FILTER_CODE.VEG},
  {label: 'Happy hours', value: constants.RESTAURANT_FILTER_CODE.HAPPY_HOURS},
];

function FilterTab(props) {
  return (
    <View>
      <CustomRadioButton
        selected={props.selected}
        data={data}
        onSelect={props.onSelect}
      />
      <View style={styles.bottomBorderLine}></View>
    </View>
  );
}

// class SortTab extends Component {
//   selectedValue = val => {};

//   render() {
//     return (
//       <View>
//         <CustomRadioButton
//           data={radioButtonText}
//           onSelect={this.selectedValue}
//         />
//         <View style={styles.bottomBorderLine}></View>
//       </View>
//     );
//   }
// }

export default FilterTab;
