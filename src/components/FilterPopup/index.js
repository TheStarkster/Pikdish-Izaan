import React, {useState, useEffect} from 'react';
import styles from './style';
import {Text, View, Modal, TouchableOpacity} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import constants from '../../config/constants';
import Tab from './components/Tab';
import SortTab from './SortTab';
import CuisineTab from './CuisineTab';
import FilterPopupButtons from './components/Buttons';
import FilterTab from './FilterTab';

function FilterPopup(props) {
  const [isMounted, setIsMounted] = useState(false);
  const [visible, setVisible] = useState(props.visible);
  const [activeTab, setActiveTab] = useState('sort');
  const [sort, setSort] = useState(
    constants.RESTAURANT_ORDER_BY_CODE.RELEVANCE,
  );
  const [filter, setFilter] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [cuisineName, setCuisineName] = useState('');

  useEffect(() => {
    if (props.visible) {
      return setVisible(true);
    }

    if (!isMounted) {
      return setIsMounted(true);
    }

    closeModal();
  }, [props.visible]);

  function closeModal() {
    const payload = {
      sort,
      filter,
      cuisine,
    };

    setVisible(false);
    props.onClose(false, payload);
  }

  function handleTabChange(newTab) {
    setActiveTab(newTab);
  }

  function handleApply() {
    const payload = {
      sort,
      filter,
      cuisine,
      cuisineName
    };

    props.onFilter(payload);
  }

  function handleClean() {
    setSort(constants.RESTAURANT_ORDER_BY_CODE.RELEVANCE);
    setFilter('');
    setCuisine('');
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={visible}
        visible={visible}
        onRequestClose={closeModal}>
        <View style={styles.popupContainer}>
          <View style={styles.box}>
            <View style={styles.popupHeader}>
              <Text style={styles.filterText}>Sort/Filter</Text>
              <TouchableOpacity onPress={closeModal}>
                <AntDesignIcon name="close" size={23} />
              </TouchableOpacity>
            </View>
            <View style={styles.borderLine}></View>
            <View style={styles.tabBar}>
              <Tab
                active={activeTab === 'sort'}
                onPress={() => handleTabChange('sort')}>
                Sort
              </Tab>
              <Tab
                active={activeTab === 'cuisine'}
                onPress={() => handleTabChange('cuisine')}>
                Cuisine
              </Tab>
              <Tab
                active={activeTab === 'filter'}
                onPress={() => handleTabChange('filter')}>
                Filter
              </Tab>
            </View>
            <View style={styles.tabContainer}>
              {activeTab === 'sort' && (
                <SortTab
                  selected={sort}
                  onSelect={item => setSort(item.value)}
                />
              )}
              {activeTab === 'cuisine' && (
                <CuisineTab
                  selected={cuisine}
                  onSelect={item => {
                    setCuisine(item.value);
                    setCuisineName(item.label);
                  }}
                />
              )}
              {activeTab === 'filter' && (
                <FilterTab
                  selected={filter}
                  onSelect={item => setFilter(item.value)}
                />
              )}
            </View>
            <FilterPopupButtons
              loading={props.isFiltering}
              onApply={handleApply}
              onClean={handleClean}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

FilterPopup.defaultProps = {
  onFilter: function() {},
};

export default FilterPopup;
