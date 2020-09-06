import React, { Component } from 'react';
import {
  View,
  Modal,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  SafeAreaView
} from 'react-native';

import style from './style';
import GeneralStyle from '../../screens/GeneralStyle';

class SearchModal extends Component {
  constructor() {
    super();

    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    if (this.textInputRef) {
      setTimeout(() => {
        if (this.textInputRef) {
          this.textInputRef.focus();
        }
      }, 500);
    }
  }

  componentDidUpdate() {
    if (this.props.visible) {
      setTimeout(() => {
        if (this.textInputRef) {
          this.textInputRef.focus();
        }
      }, 500);
    }
  }

  closeModal() {
    this.props.onClose(false);
  }

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
        onRequestClose={() => {
          props.onClose(false);
        }}>
        <SafeAreaView style={GeneralStyle.flex1}>
          <TouchableWithoutFeedback onPress={this.closeModal}>
            <View style={style.container}>
              <TouchableWithoutFeedback onPress={this.stopPropagation}>
                <View style={style.header}>
                  <TouchableOpacity onPress={this.closeModal}>
                    <View style={style.iconContainer}>
                      <Image
                        style={style.icon}
                        resizeMode="contain"
                        source={require('../../assets/icon/back.png')}
                      />
                    </View>
                  </TouchableOpacity>
                  <TextInput
                    ref={ref => (this.textInputRef = ref)}
                    value={props.value}
                    // autoFocus={true}
                    onChangeText={props.onChangeText}
                    style={style.textInput}
                    placeholder={props.placeholder}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </Modal>
    );
  }
}

SearchModal.defaultProps = {
  onChangeText: function () { },
  placeholder: 'Search...',
};

export default SearchModal;
