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
import moment from 'moment';

import ErrorBox from '../ErrorBox';
import Input from './Input';
import Button from '../Button';
import RadioButton from '../RadioButton';
import CustomRadioButton from '../CustomRadioButton';

const radioButtonText = [
  {label: 'Full Payment', value: 0},
  {label: 'Partial Payment', value: 1},
];

class FilterPopup extends Component {
  constructor() {
    super();

    this.state = {
      lineCenter: false,
      lineRight: false,
      sortTab: true,
      numberOfPeople: '',
      selected: 'full',
      errorMessage: '',
      pickupTime: '',
      arrivalTime: '',
    };

    this.closeModal = this.closeModal.bind(this);
    this.handleSelectValue = this.handleSelectValue.bind(this);
  }

  closeModal() {
    const payload = {
      pickupTime: this.state.pickupTime,
      arrivalTime: this.state.arrivalTime,
      numberOfPeople: this.state.numberOfPeople,
    };

    this.props.onClose(false, payload);
  }

  handleSelectValue() {}

  stopPropagation(e) {
    e.stopPropagation();
  }

  handleTextChange = e => {
    if (!isNaN(e)) {
      this.setState({numberOfPeople: e});
    }
  };

  handleDateChange = time => {
    const date = moment().format('YYYY-MM-DD');
    const t = moment();
    const t2 = moment(date + ' ' + time);
    t.add('minute', 30);

    if (t2.isBefore(t)) {
      return this.setState({
        errorMessage: 'Select the time which have more than 30 minutes',
      });
    }

    this.setState({pickupTime: t2.format('HH:mm')});
  };

  handleDateChange2 = time => {
    const date = moment().format('YYYY-MM-DD');
    // const t = moment();
    const t2 = moment(date + ' ' + time);
    // t.add('minute', 30);

    // if (t2.isBefore(t)) {
    //   return this.setState({
    //     errorMessage: 'Select the time which have more than 30 minutes',
    //   });
    // }

    // this.setState({arrivalTime: time.format('HH:mm')});
    this.setState({arrivalTime: t2.format('HH:mm')});
  };

  renderInput() {
    if (!this.props.isPickup) {
      return (
        <View>
          <Input
            placeholder="Arrival Time"
            value={this.state.arrivalTime}
            handleDateChange={this.handleDateChange2}
            label="Arrival Time"
          />
          <Input
            numberOfPeople={this.state.numberOfPeople}
            handleTextChange={this.handleTextChange}
            isNumber={true}
            label="Number of People"
          />
        </View>
      );
    } else {
      return (
        <View>
          <Input
            placeholder="Pick Up Time"
            value={this.state.pickupTime}
            handleDateChange={this.handleDateChange}
            label="Pick Up Time"
          />
        </View>
      );
    }
  }

  handleRadioChange = sel => {
    this.setState({selected: sel});
  };

  render() {
    const {selected, errorMessage} = this.state;
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
                    <TouchableOpacity onPress={this.closeModal}>
                      <AntDesignIcon name="close" size={23} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.borderLine} />
                  <View style={styles.inputContainer}>
                    {this.renderInput()}
                  </View>
                  <View style={styles.tabContainer}>
                    <View>
                      <RadioButton
                        selected={selected === 'full'}
                        onSelect={() => this.handleRadioChange('full')}
                        label="Full Payment"
                      />
                      <RadioButton
                        selected={selected === 'partial'}
                        onSelect={() => this.handleRadioChange('partial')}
                        label="Partial Payment"
                      />
                      <View style={styles.bottomBorderLine} />
                    </View>
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button
                      onPress={this.closeModal}
                      buttonStyles={styles.button}>
                      Pay Now
                    </Button>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <ErrorBox
          message={errorMessage}
          onClose={() => this.setState({errorMessage: ''})}
        />
      </View>
    );
  }
}

export default FilterPopup;
