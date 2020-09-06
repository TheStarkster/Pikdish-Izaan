import React, { Component } from 'react'
import { Text, View, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import styles from './style'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import Button from '../../components/Button'

class TableBookingPagePopup extends Component {
    constructor() {
        super();
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.onClose(false);
    }
    stopPropagation(e) {
        e.stopPropagation();
      }
    

    render() {
        const { visible } = this.props;
        return (
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={visible}
                    onRequestClose={this.closeModal}>
                    <TouchableWithoutFeedback onPress={this.closeModal}>
                        <View style={styles.popupContainer}>
                        <TouchableWithoutFeedback onPress={this.stopPropagation}>
                            <View style={styles.popupMiniContainer}>
                                <View style={styles.closeIconContainer}>
                                <TouchableOpacity style={styles.closeIcon} onPress={this.closeModal}>
                                    <AntDesignIcon name="close" size={24} />
                                </TouchableOpacity>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button buttonStyles={styles.button}>Payment </Button>
                                    <Button buttonStyles={styles.button}>New Item </Button>
                                </View>
                            </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

            </View>
        )
    }
}

export default TableBookingPagePopup
