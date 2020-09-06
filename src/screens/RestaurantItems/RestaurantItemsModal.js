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
import GeneralStyle from '../GeneralStyle';

class RestaurantItemsModal extends Component {
  constructor() {
    super();

    this.state = {
      lineCenter: false,
      lineRight: false,
      sortTab: true,
    };

    this.closeModal = this.closeModal.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);
  }

  closeModal() {
    this.props.onClose(false);
  }

  handleClick = val => {
    this.props.onPress(val.category_name);
    this.props.onClose(false);
  };

  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    const {
      visible,
      selected,
      categories,
      recommededItems,
      happyItems,
    } = this.props;

    return (
      <View>
        <Modal
          animationType="fade"
          transparent={visible}
          visible={visible}
          onRequestClose={this.closeModal}>
          <TouchableWithoutFeedback
            style={GeneralStyle.flex1}
            onPress={this.closeModal}>
            <View style={styles.RestaurantItemsModalContainer}>
              <TouchableWithoutFeedback onPress={this.stopPropagation}>
                <View style={styles.RestaurantItemsModalbox}>
                  <TouchableOpacity
                    style={styles.RestaurantItemsModalHeader}
                    onPress={this.closeModal}>
                    <AntDesignIcon name="close" size={22} />
                  </TouchableOpacity>
                  {!!happyItems.length && (
                    <Item
                      val={{
                        category_name: 'Happy Hours',
                        item: happyItems,
                      }}
                      onPress={this.handleClick}
                      selected={selected}
                    />
                  )}
                  {!!recommededItems.length && (
                    <Item
                      val={{
                        category_name: 'Recommended',
                        item: recommededItems,
                      }}
                      onPress={this.handleClick}
                      selected={selected}
                    />
                  )}
                  {categories.map((val, i) => (
                    <Item
                      selected={selected}
                      onPress={this.handleClick}
                      key={i}
                      val={val}
                    />
                  ))}
                  <View style={styles.paddingBottom}></View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

RestaurantItemsModal.defaultProps = {
  categories: [],
  recommededItems: [],
  happyItems: [],
};

export default RestaurantItemsModal;

function Item({val, onPress, selected}) {
  return (
    <TouchableOpacity onPress={() => onPress(val)}>
      <View style={styles.RestaurantItemsModalContentContainer}>
        <View style={GeneralStyle.flexRow}>
          <View style={styles.checkIconContainer}>
            {selected === val.category_name.toLowerCase() && (
              <AntDesignIcon
                name={'check'}
                size={20}
                style={styles.checkIcon}
              />
            )}
          </View>
          <Text style={styles.text}>{val.category_name}</Text>
        </View>
        <Text style={styles.number}>{val.item.length}</Text>
      </View>
    </TouchableOpacity>
  );
}
