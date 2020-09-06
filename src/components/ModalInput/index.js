import React, {Component} from 'react';
import {Modal, View, Text, TouchableWithoutFeedback} from 'react-native';

import BorderedInput from '../BorderedInput';
import Button from '../Button';
import GeneralStyle from '../../screens/GeneralStyle';
import style from './style';

class ModalInput extends Component {
  state = {
    code: '',
  };

  componentDidMount() {
    this.setState({code: this.props.code});
    // this.input.focus();
  }

  closeModal = () => {
    this.props.onClose(false, this.state.code);
  };

  handleChange = e => {
    this.setState({code: e});
  };

  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    const props = this.props;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
        onRequestClose={this.closeModal}>
        <TouchableWithoutFeedback onPress={this.closeModal}>
          <View style={style.container}>
            <TouchableWithoutFeedback onPress={this.stopPropagation}>
              <View style={style.boxContainer}>
                <View style={style.headingContainer}>
                  <Text style={style.heading}>Apply Referral Code</Text>
                </View>
                <View style={style.inputContainer}>
                  <BorderedInput
                  maxLength={this.props.maxLength}
                    value={this.state.code}
                    onChangeText={this.handleChange}
                    focusOnMount={true}
                    placeholder="Enter code"
                  />
                </View>
                <View style={GeneralStyle.mediumMarginTop}>
                  <Button
                    onPress={this.closeModal}
                    disabled={false}
                    buttonStyles={GeneralStyle.w100}>
                    Proceed
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

export default ModalInput;
