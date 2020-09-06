import React, {Component} from 'react';
import styles from './style';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import Button from '../Button';
import RadioButton from '../../components/RadioButton';
import Checkbox from '../../components/Checkbox';
import api from '../../config/api';
import GeneralStyle from '../../screens/GeneralStyle';

class CallWaiterModal extends Component {
  constructor() {
    super();

    this.state = {
      lineCenter: false,
      lineRight: false,
      sortTab: true,
      isLoading: false,
      selectedOption: [],
      options: [],
      errorMessage: '',
    };

    this.closeModal = this.closeModal.bind(this);
    this.handleSelectValue = this.handleSelectValue.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      this.setState({isLoading: true});

      const payload = {restaurant_id: this.props.restaurantId};

      const response = await api.getCallWaiterOptions(payload);

      this.setState({options: response.options});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  closeModal() {
    this.props.onClose(false);
  }

  handleSelectValue() {}

  stopPropagation(e) {
    e.stopPropagation();
  }

  handleCheckboxChange = data => {
    const {selectedOption} = this.state;
    const index = selectedOption.indexOf(data.id);

    if (index !== -1) {
      selectedOption.splice(index, 1);
    } else {
      selectedOption.push(data.id);
    }

    this.setState({selectedOption});
  };

  render() {
    const {options, isLoading, errorMessage, selectedOption} = this.state;
    const {visible} = this.props;

    return (
      <View>
        <Modal
          animationType="fade"
          transparent={visible}
          visible={visible}
          onRequestClose={this.closeModal}>
          <TouchableWithoutFeedback onPress={this.closeModal}>
            <View style={styles.popupContainer}>
              <TouchableWithoutFeedback onPress={this.stopPropagation}>
                <View style={styles.box}>
                  <View style={styles.popupHeader}>
                    <Text style={styles.filterText}>Call Waiter for</Text>
                    <TouchableOpacity onPress={this.closeModal}>
                      <AntDesignIcon name="close" size={23} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.borderLine}></View>
                  <View style={styles.tabContainer}>
                    <View style={GeneralStyle.mediumMarginTop}>
                      {options.map((item, i) => (
                        <Checkbox
                          key={i}
                          data={item}
                          onChange={this.handleCheckboxChange}
                          checked={selectedOption.includes(item.id)}
                          label={item.options}
                        />
                      ))}
                      <View style={styles.bottomBorderLine}></View>
                    </View>
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button
                      onPress={this.closeModal}
                      buttonStyles={styles.button}>
                      Call Waiter
                    </Button>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        {isLoading && <Loader />}
        <ErrorBox
          message={errorMessage}
          onClose={() => this.setState({errorMessage: ''})}
        />
      </View>
    );
  }
}

export default CallWaiterModal;
