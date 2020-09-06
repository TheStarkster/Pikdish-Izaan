import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';

import style from './style';
import constants from '../../../../config/constants';

function FilterPopupButtons(props) {
  return (
    <View style={style.filterButtonsContainer}>
      <View style={[style.buttonBox, {marginLeft: 0}]}>
        <TouchableOpacity onPress={props.onClean}>
          <Text style={style.buttonText}>Clean All</Text>
        </TouchableOpacity>
      </View>
      {props.loading ? (
        <View style={style.loadingBox}>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: constants.BASE_PIC_PATH + props.theme.loading_image}}
          />
        </View>
      ) : (
        <View style={style.buttonBox}>
          <TouchableOpacity onPress={props.onApply}>
            <Text style={style.buttonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

FilterPopupButtons.defaultProps = {
  onClean: function() {},
  onApply: function() {},
};

const mapStateToProps = store => ({
  theme: store.theme.appTheme,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPopupButtons);
