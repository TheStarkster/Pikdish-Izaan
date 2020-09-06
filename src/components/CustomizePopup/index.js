import React, {Component} from 'react';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './style';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import Radio from './components/Radio';
import ColoredCircle from '../../components/ColoredCircle';
import GeneralStyles from '../../screens/GeneralStyle';
import Checkbox from './components/Checkbox';
import Button from './Button';
import helpers from '../../config/helpers';

class CustomizePopup extends Component {
  state = {
    portion: '',
    addon: [],
    topping: [],
    preparationType: '',
  };

  closeModal = () => {
    this.props.onClose(false, {...this.state});
  };

  stopPropagation(e) {
    e.stopPropagation();
  }

  handleAddonChange = newAddon => {
    let {addon} = this.state;
    const {data} = this.props;

    if (!addon) addon = [];

    const index = addon.findIndex(
      item => newAddon.addon_id === item.rest_addons_id,
    );

    if (index !== -1) {
      addon.splice(index, 1);
    } else {
      const payload = {
        rest_item_id: data.id,
        rest_addons_id: newAddon.addon_id,
        amount: newAddon.value,
      };

      addon.push(payload);
    }

    this.setState({addon});
  };

  handlePortionChange = newPortion => {
    const {portion} = this.state;

    if (newPortion === portion) {
      return this.setState({portion: ''});
    }

    this.setState({portion: newPortion});
  };

  handlePreparationChange = newPortion => {
    const {preparationType} = this.state;

    if (newPortion === preparationType) {
      return this.setState({preparationType: ''});
    }

    this.setState({preparationType: newPortion});
  };

  handleToppingChange = newTopping => {
    let {topping} = this.state;
    const {data} = this.props;

    if (!topping) topping = [];

    const index = topping.findIndex(
      item => newTopping.top_id === item.rest_toppings_id,
    );

    if (index !== -1) {
      topping.splice(index, 1);
    } else {
      const payload = {
        rest_item_id: data.id,
        rest_toppings_id: newTopping.top_id,
        amount: newTopping.value,
      };

      topping.push(payload);
    }

    this.setState({topping});
  };

  renderPortions = () => {
    const {portion} = this.state;
    const {data} = this.props;

    if (!data || !data.portions) return null;

    const elements = data.portions.map(item => {
      return (
        <Radio
          price={helpers.getPortionPrice(data, item)}
          onChange={this.handlePortionChange}
          id={item.portion_id}
          selected={item.portion_id === portion}
          key={item.portion_id}>
          {item.portion_name}
        </Radio>
      );
    });

    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Quantity</Text>
        {elements}
      </View>
    );
  };
  // preparation_type_available

  renderPreparationType = () => {
    const {preparationType} = this.state;
    const {data} = this.props;

    if (!data || data.preparation_type_available === '0') return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Preparation</Text>

        <Radio
          onChange={this.handlePreparationChange}
          id="0"
          selected={'0' === preparationType}>
          Regular
        </Radio>
        <Radio
          onChange={this.handlePreparationChange}
          id="1"
          selected={'1' === preparationType}>
          Jain
        </Radio>
      </View>
    );
  };

  renderToppings = () => {
    let {topping} = this.state;
    const {data} = this.props;

    if (!topping) topping = [];

    if (!data || !data.topping) return null;

    const elements = data.topping.map(item => {
      const isFound = topping.some(item =>
        data.topping.some(a => a.top_id === item.rest_toppings_id),
      );

      return (
        <Checkbox
          onChange={this.handleToppingChange}
          id={item.top_id}
          data={item}
          checked={isFound}
          key={item.top_id}
          price={item.value}
          label={item.topping_name}
        />
      );
    });

    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Toppings</Text>
        {elements}
      </View>
    );
  };

  renderAddons = () => {
    let {addon} = this.state;
    const {data} = this.props;

    if (!addon) addon = [];

    if (!data || !data.addon) return null;

    const elements = data.addon.map(item => {
      const isFound = data.addon.some(item =>
        addon.some(a => a.rest_addons_id === item.addon_id),
      );

      return (
        <Checkbox
          onChange={this.handleAddonChange}
          id={item.addon_id}
          data={item}
          checked={isFound}
          key={item.addon_id}
          price={item.value}
          label={item.addons}
        />
      );
    });

    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Add Ons</Text>
        {elements}
      </View>
    );
  };

  getBaseRate = () => {
    let baserate = this.props.data.baserate;

    if (this.props.is_happy_hours === '1') {
      baserate = this.props.data.happyrate;
    }

    return baserate;
  };

  calculateTotal = () => {
    const {addon, portion, topping} = this.state;
    const {data} = this.props;

    let baserate = this.props.data.baserate;

    if (this.props.is_happy_hours === '1') {
      baserate = this.props.data.happyrate;
    }

    const addonTotal = addon.reduce((acc, item) => Number(item.value) + acc, 0);

    if (Number(addonTotal)) {
      baserate = Number(baserate) + Number(addonTotal);
    }

    if (portion) {
      const item = data.portions.find(item => item.portion_id === portion);

      if (item) {
        const rate =
          data.is_happy_hours === '1' ? item.happyrate : item.baserate;
        baserate = Number(baserate) + Number(rate);
      }
    }

    const toppingTotal = topping.reduce(
      (acc, item) => acc + Number(item.value),
      0,
    );

    if (Number(toppingTotal)) {
      baserate = Number(baserate) + Number(toppingTotal);
    }

    return Number(baserate).toFixed(2);
  };

  render() {
    const {visible, data} = this.props;

    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={this.closeModal}>
          <TouchableWithoutFeedback onPress={this.closeModal}>
            <View style={styles.customizePopupContainer}>
              <TouchableWithoutFeedback onPress={this.stopPropagation}>
                <View style={styles.customizeBox}>
                  <View style={styles.customizePopupHeader}>
                    <View
                      style={[
                        GeneralStyles.flexRow,
                        GeneralStyles.alignCenter,
                      ]}>
                      <ColoredCircle boxStyles={styles.coloredCircleBox} />
                      <View style={GeneralStyles.smallMarginLeft}>
                        <Text style={styles.customizePopupHeaderText}>
                          Customize {data.item_name}
                        </Text>
                        <Text style={styles.amount}>₹{this.getBaseRate()}</Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={this.closeModal}>
                      <AntDesignIcon name="close" size={24} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.popupHeaderBorderLine} />
                  {this.renderPortions()}
                  {this.renderPreparationType()}
                  {this.renderAddons()}
                  {this.renderToppings()}
                  {/* <Checkbox data={checkboxdata} title="Add Ons" /> */}
                  <View
                    style={[
                      styles.popupHeaderBorderLine,
                      GeneralStyles.mediumMarginTop,
                    ]}
                  />
                  <Button
                    total={this.calculateTotal()}
                    onPress={this.closeModal}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

CustomizePopup.defaultProps = {
  data: {},
};

export default CustomizePopup;
