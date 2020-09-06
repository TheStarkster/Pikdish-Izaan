import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {styles, pickerSelectStyles} from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';

import tableActions from '../../redux/table/action';
import api from '../../config/api';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import Table from './Table';
import Header from '../../components/Header';
import GeneralStyles from '../GeneralStyle';
import RestaurantDetailsHeader from '../../components/RestaurantDetailsHeader';
import TableBookingPagePopup from '../../components/TableBookingPagePopup';

class TableBookingPage extends Component {
  constructor() {
    super();

    this.state = {
      table: 'booked',
      isReferralModal: false,
      isLoading: false,
      errorMessage: '',
      departments: [],
      selectedDepartment: '',
      tables: [],
      isSearchModal: false,
    };

    this.handleReferralModalChange = this.handleReferralModalChange.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  async componentDidMount() {
    try {
      this.setState({isLoading: true});

      const response = await this.getDepartments();

      this.setState({departments: response}, () => {
        this.props.setSelectedDepartment(response[0].value);
        this.fetchTable();
      });

      // const promises = [this.fetchRestaurant(), this.getDepartments()];
      // const responses = await Promise.all(promises);

      // const rest = responses[0].restro || [];

      // setUserRestaurant(rest[0]);

      // this.setState({departments: responses[1]}, () => {
      //   this.setState({selectedDepartment: responses[1][0].value}, () =>
      //     this.fetchTable(),
      //   );
      // });
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  }

  fetchRestaurant = async () => {
    const {user} = this.props;

    try {
      const payload = {
        restaurant_id: user.team_restaurant_id,
        order_type: '1',
        user_id: user.id,
        cuisine_id: '',
      };

      const response = await api.appRestroDataByID(payload);

      return response;
    } catch (e) {
      throw e;
    }
  };

  getDepartments = async () => {
    const {user} = this.props;

    try {
      const payload = {restaurant_id: user.team_restaurant_id};

      const response = await api.restroDepartmentKeyPair(payload);

      const list = response.list.map(item => ({
        label: item.dept_name,
        value: item.id,
      }));

      return list;
    } catch (e) {
      throw e;
    }
  };

  handleReferralModalChange(isReferralModal) {
    this.setState({isReferralModal});
  }

  openModal() {
    this.setState({isReferralModal: true});
  }

  fetchTable = async () => {
    const {user} = this.props;
    const {selectedDepartment} = this.state;

    if (!selectedDepartment) {
      this.setState({tables: []});
      return;
    }

    this.setState({isLoading: true});

    try {
      const payload = {
        department_id: selectedDepartment,
        restaurant_id: user.team_restaurant_id,
      };

      const tables = await api.getRestroTableByDept(payload);

      this.setState({tables: tables.list || []});
    } catch (e) {
      this.setState({errorMessage: e.message});
    }

    this.setState({isLoading: false});
  };

  handleTablePress = data => {
    this.props.setSelectedTable(data.table_no);
    // if (isBooked) return this.openModal();

    this.props.navigation.navigate('BookTable');
  };

  render() {
    const {restaurant, selectedDepartment} = this.props;
    const {
      isLoading,
      errorMessage,
      isReferralModal,
      departments,
      tables,
    } = this.state;

    const placeholder = {
      label: 'Department',
      value: null,
      color: '#9EA0A4',
    };

    return (
      <View>
        <Header>Take Order</Header>
        <View style={styles.bookingPageContainer}>
          <View style={styles.restaurantDetailsHeader}>
            <RestaurantDetailsHeader restaurant={restaurant} />
          </View>
          <View style={[GeneralStyles.container, GeneralStyles.noMarginTop]}>
            <View style={styles.bookingSectionContainer}>
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  onValueChange={value =>
                    this.setState({selectedDepartment: value}, () =>
                      this.fetchTable(),
                    )
                  }
                  value={selectedDepartment}
                  items={departments}
                  placeholder={placeholder}
                  style={pickerSelectStyles}
                  Icon={() => {
                    return (
                      <View style={styles.arrowDownIconContainer}>
                        <Entypo
                          name="chevron-down"
                          style={styles.arrowDownIcon}
                        />
                      </View>
                    );
                  }}
                />
              </View>
              <ScrollView>
                <View style={styles.tablesContainer}>
                  {tables.map(item => (
                    <Table
                      key={item.id}
                      data={item}
                      onPress={this.handleTablePress}
                    />
                  ))}
                  {/* <Table
                    onPress={this.handleTablePress.bind(this, true)}
                    isBooked={true}
                    time="00:12:13"
                    amount="₹200"
                  />
                  <Table onPress={this.handleTablePress.bind(this, false)} />
                  <Table onPress={this.handleTablePress.bind(this, false)} />
                  <Table onPress={this.handleTablePress.bind(this, false)} />
                  <Table onPress={this.handleTablePress.bind(this, false)} /> */}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
        <TableBookingPagePopup
          onClose={this.handleReferralModalChange}
          visible={isReferralModal}
        />
        {isLoading && <Loader />}
        <ErrorBox
          message={errorMessage}
          onClose={() => this.setState({errorMessage: ''})}
        />
      </View>
    );
  }
}

const mapStateToProps = store => ({
  user: store.auth.user,
  restaurant: store.auth.restaurant || {},
  selectedDepartment: store.table.selectedDepartment,
});

const mapDispatchToProps = {
  setSelectedDepartment: tableActions.setSelectedDepartment,
  setSelectedTable: tableActions.setSelectedTable,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableBookingPage);
