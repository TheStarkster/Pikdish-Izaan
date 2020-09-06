import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import themeActions from '../../redux/theme/action';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';
import styles from './style';
import CustomRadioButton from '../CustomRadioButton';
import api from '../../config/api';

function CuisineTab(props) {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCuisine();
  }, []);

  async function fetchCuisine() {
    const {theme, cuisines, setCuisine} = props;

    try {
      if (cuisines.length) return;

      setLoading(true);

      const payload = {restaurant_id: theme.restaurant_id};

      const response = await api.getCuisineList(payload);

      const data = response.options.map(item => ({
        label: item.cuisine_name,
        value: item.id,
      }));

      setCuisine(data);
    } catch (e) {
      setErrorMessage(e.message);
    }

    setLoading(false);
  }

  return (
    <View>
      <CustomRadioButton
        selected={props.selected}
        data={props.cuisines}
        onSelect={props.onSelect}
      />
      <View style={styles.bottomBorderLine}></View>
      {isLoading && <Loader />}
      <ErrorBox message={errorMessage} onClose={() => setErrorMessage('')} />
    </View>
  );
}

// class SortTab extends Component {
//   state = {
//     isLoading: false,
//     radioButtonText: [],
//   };

//   componentDidMount() {
//     this.fetchCuisine();
//   }

//   fetchCuisine = async () => {
//     const {theme} = this.props;

//     try {
//       this.setState({isLoading: true});

//       const payload = {restaurant_id: theme.restaurant_id};

//       //   const payload = {restaurant_id: theme.restaurant_id};

//       const response = await api.getCuisineList(payload);

//       const radioButtonText = response.options.map((item, index) => ({
//         label: item.cuisine_name,
//         value: index,
//       }));

//       this.setState({radioButtonText});
//     } catch (e) {
//       this.setState({errorMessage: e.message});
//     }

//     this.setState({isLoading: false});
//   };

//   selectedValue = val => {};

//   render() {
//     const {errorMessage, isLoading, radioButtonText} = this.state;

//     return (
//       <View>
//         <CustomRadioButton
//           data={radioButtonText}
//           onSelect={this.selectedValue}
//         />
//         <View style={styles.bottomBorderLine}></View>
//         {isLoading && <Loader />}
//         <ErrorBox
//           message={errorMessage}
//           onClose={() => this.setState({errorMessage: ''})}
//         />
//       </View>
//     );
//   }
// }

const mapStateToProps = store => ({
  theme: store.theme.appTheme,
  cuisines: store.theme.cuisines,
});

const mapDispatchToProps = {
  setCuisine: themeActions.setCuisine,
};

export default connect(mapStateToProps, mapDispatchToProps)(CuisineTab);
