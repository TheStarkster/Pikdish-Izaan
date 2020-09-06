import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import constants from '../../config/constants';
import colors from '../../config/colors';

import GeneralStyle from '../GeneralStyle';

class Slider extends Component {
  state = {
    currentIndex: 0,
    data: [],
  };

  componentDidMount() {
    this.prepareImages(this.props.data);
  }

  componentDidUpdate(prevProps) {
    const {data: prevData} = prevProps;
    const {data} = this.props;

    if (prevData.length !== data.length) {
      this.prepareImages(data);
    }
  }

  prepareImages = data => {
    const newData = [];

    for (let i = 0; i < data.length; i++) {
      if (i % 2 === 0) {
        const payload = {
          image1: data[i] && data[i].image_name,
          image2: data[i + 1] && data[i].image_name,
        };

        newData.push(payload);
      }
    }

    this.setState({data: newData});
  };

  renderItem({item}) {
    return (
      <View style={style.imageContainer}>
        <View style={[GeneralStyle.flex1, style.firstImage]}>
          <Image
            style={[style.image]}
            resizeMode="cover"
            source={{
              uri: constants.RESTAURANT_LOGO_PATH + item.image1,
            }}
          />
        </View>
        <View style={[GeneralStyle.flex1, style.secondImage]}>
          {item.image2 && (
            <Image
              style={style.image}
              resizeMode="cover"
              source={{
                uri: constants.RESTAURANT_LOGO_PATH + item.image2,
              }}
            />
          )}
        </View>
      </View>
    );
  }

  onSnap = currentIndex => this.setState({currentIndex});

  render() {
    const {data} = this.state;

    return (
      <View style={style.container}>
        {!!data.length && (
          <Carousel
            ref={c => (this._carousel = c)}
            data={data}
            loop={true}
            renderItem={this.renderItem}
            sliderWidth={constants.WINDOW_WIDTH}
            itemWidth={constants.WINDOW_WIDTH}
            onSnapToItem={this.onSnap}
          />
        )}
        <View style={style.dotContainer}>
          {data.map((item, index) => (
            <Indicator active={index === this.state.currentIndex} />
          ))}
        </View>
      </View>
    );
  }
}

export default Slider;

const style = StyleSheet.create({
  container: {
    marginTop: constants.MARGIN_SMALL * 1.4,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: constants.WINDOW_HEIGHT * 0.2,
  },
  firstImage: {
    marginRight: constants.PADDING_MEDIUM * 0.5,
  },
  secondImage: {
    marginRight: constants.PADDING_MEDIUM,
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: constants.MARGIN_SMALL * 1.4,
  },
  indicator: {
    width: constants.WINDOW_WIDTH * 0.03,
    height: constants.WINDOW_WIDTH * 0.03,
    borderRadius: constants.WINDOW_WIDTH * 0.02,
    backgroundColor: 'black',
    marginHorizontal: constants.MARGIN_X_SMALL * 0.6,
  },
  active: {
    backgroundColor: colors.RED,
  },
});

const Indicator = props => (
  <View style={[style.indicator, props.active && style.active]} />
);
