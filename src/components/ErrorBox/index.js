import React from 'react';
import {View, Text, Modal, TouchableWithoutFeedback} from 'react-native';

import style from './style';
import Button from '../Button';

const ErrorBox = props => {
  function closeModal() {
    props.onClose(false);
  }

  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!props.message}
      onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={style.container}>
          <TouchableWithoutFeedback onPress={stopPropagation}>
            <View style={style.boxContainer}>
              <View style={style.detailContainer}>
                <Text style={style.heading}>{props.heading}</Text>
                <Text style={style.message}>{props.message}</Text>
              </View>
              <Button onPress={closeModal} buttonStyles={style.button}>
                Okay
              </Button>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

ErrorBox.defaultProps = {
  heading: 'What went wrong!',
  onClose: function() {},
};

export default ErrorBox;
