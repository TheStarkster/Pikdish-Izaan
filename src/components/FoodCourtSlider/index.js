import React, {Component} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';

import constants from '../../config/constants';
import style from './style';

class FoodCourtSlider extends Component {
  constructor() {
    super();

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress(item.item)}
        style={[style.container, this.props.containerStyle]}>
        <Image
          source={{uri: constants.RESTAURANT_LOGO_PATH + item.item.ad_image}}
          style={[style.image, this.props.imageStyle]}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  }

  render() {
    const {data, minusWidth} = this.props;

    return (
      <Carousel
        renderItem={this.renderItem}
        ref={foodCourtSlider => (this.foodCourtSlider = foodCourtSlider)}
        data={data}
        contentContainerCustomStyle={{paddingLeft: 0}}
        sliderWidth={constants.WINDOW_WIDTH}
        itemWidth={constants.WINDOW_WIDTH - this.props.itemWidthDifference}
        hasParallaxImages={true}
      />
    );
  }
}

FoodCourtSlider.defaultProps = {
  itemWidthDifference: 140,
  onPress: function() {},
};

export default FoodCourtSlider;
