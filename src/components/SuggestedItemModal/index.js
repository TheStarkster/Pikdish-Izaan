import React, {useState} from 'react';
import {
  View,
  Modal,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import OutlineButton from '../OutlineButton';
import style from './style';
import GeneralStyle from '../../screens/GeneralStyle';

const SuggestedItemModal = props => {
  function stopPropagation(e) {
    e.stopPropagation();
  }

  function closeModal(e) {
    props.onClose(false);
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        props.onClose(false);
      }}>
      <TouchableWithoutFeedback style={GeneralStyle.flex1} onPress={closeModal}>
        <View style={style.mainContainer}>
          <TouchableWithoutFeedback
            style={GeneralStyle.flex1}
            onPress={stopPropagation}>
            <View style={[style.container]}>
              <View style={style.header}>
                <Text style={style.headerTitle}>Suggested Item</Text>
                <TouchableOpacity onPress={closeModal}>
                  <Image
                    style={style.closeIcon}
                    source={require('../../assets/icon/close.png')}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={style.itemContainer}>
                  <Item onCustomizePress={props.onCustomizePress} />
                  <Item onCustomizePress={props.onCustomizePress} />
                  {/* <Item />
                  <Item /> */}
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SuggestedItemModal;

const Item = (props) => {
  const [amount, setAmount] = useState(0);  

  return (
    <View style={style.item}>
      <Image
        style={style.image}
        source={require('../../assets/images/butter-chicken.jpg')}
      />
      <View style={style.afterImage}>
        <Text style={style.itemTitle}>Kaju Kaju Punjabi</Text>
        <View style={[GeneralStyle.flexRow, style.buttonContainer]}>
          <Text style={style.price}>₹300</Text>
          <OutlineButton
            onSubtract={() => setAmount(amount - 1)}
            onPlus={() => setAmount(amount + 1)}
            amount={amount}
            onPress={() => setAmount(amount + 1)}
            customizable={amount > 0}
            showCustomization={true}
            onCustomizePress={props.onCustomizePress}
            >
            ADD
          </OutlineButton>
        </View>
      </View>
    </View>
  );
};
