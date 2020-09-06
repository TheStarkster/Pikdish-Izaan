import React from 'react';
import {View, Text, Modal, TouchableWithoutFeedback} from 'react-native';

import GeneralStyle from '../../screens/GeneralStyle';
import style from './style';
import Button from '../Button';

const ConfirmationPopup = props => {
  function closeModal(isPositive) {
    props.onClose(isPositive);
  }

  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={style.container}>
          <TouchableWithoutFeedback onPress={stopPropagation}>
            <View style={style.boxContainer}>
              <View style={style.detailContainer}>
                <Text style={style.heading}>{props.heading}</Text>
                <Text style={style.message}>{props.message}</Text>
              </View>
              <View style={[GeneralStyle.flexRow]}>
                <Button
                  onPress={() => closeModal(false)}
                  buttonStyles={[style.button, style.buttonLeft]}>
                  No
                </Button>
                <Button
                  onPress={() => closeModal(true)}
                  buttonStyles={style.button}>
                  Yes
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

ConfirmationPopup.defaultProps = {
  heading: 'Heading',
  onClose: function() {},
};

export default ConfirmationPopup;
