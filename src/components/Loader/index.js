import React from 'react';
import {View, Text, Modal, Image} from 'react-native';
import {connect} from 'react-redux';

import constants from '../../config/constants';
import style from './style';

const Loader = props => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={() => {}}>
      <View style={style.container}>
        <View style={style.mainContainer}>
          <Image
            style={style.loadingImage}
            source={{
              uri: constants.BASE_PIC_PATH + props.theme.loading_image,
            }}
          />
          {/* <Text style={style.loadingText}>Loading...</Text> */}
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = store => ({
  theme: store.theme.appTheme,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
