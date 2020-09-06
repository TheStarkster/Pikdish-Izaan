import React, {Component} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {View} from 'react-native';
import GeneralStyle from '../../screens/GeneralStyle';
import style from './style';

class QRCamera extends Component {
  render() {
    return (
      <View style={[GeneralStyle.flex1]}>
        <View style={style.scanArea}></View>
        <QRCodeScanner
          reactivate={this.props.reactivate}
          reactivateTimeout={this.props.reactivateTimeout}
          onRead={this.props.onRead}
          containerStyle={style.containerStyle}
          cameraStyle={style.qrCamera}
        />
      </View>
    );
  }
}

QRCamera.defaultProps = {
  reactivate: false,
  reactivateTimeout: 5000,
};

export default QRCamera;
