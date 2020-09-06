import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';

import GeneralStyle from '../../screens/GeneralStyle';
import style from './style';
import constants from '../../config/constants';

class AppDetailsSlider extends Component {
  constructor() {
    super();

    this.renderItem = this.renderItem.bind(this);
    this.onSnap = this.onSnap.bind(this);
  }

  componentDidMount() {
    this.parseData();
  }

  parseData() {
    const {theme} = this.props;

    const data = [
      {
        heading: theme.explore_heading1,
        message: theme.explore_detail1,
        url: theme.exp_image_path + '/' + theme.explore_image1,
      },
      {
        heading: theme.explore_heading2,
        message: theme.explore_detail2,
        url: theme.exp_image_path + '/' + theme.explore_image2,
      },
      {
        heading: theme.explore_heading3,
        message: theme.explore_detail3,
        url: theme.exp_image_path + '/' + theme.explore_image3,
      },
      {
        heading: theme.explore_heading4,
        message: theme.explore_detail4,
        url: theme.exp_image_path + '/' + theme.explore_image4,
      },
    ];

    this.setState({data});
  }

  state = {
    currentIndex: 0,
    data: null,
  };

  renderItem({item}) {
    return (
      <Image style={style.image} resizeMode="cover" source={{uri: item.url}} />
    );
  }

  onSnap(currentIndex) {
    this.setState({currentIndex});
  }

  render() {
    const {data} = this.state;

    if (!data) return null;

    return (
      <View>
        <Carousel
          ref={appDetailsSlider => (this.appDetailsSlider = appDetailsSlider)}
          data={data}
          renderItem={this.renderItem}
          sliderWidth={constants.WINDOW_WIDTH}
          itemWidth={constants.WINDOW_WIDTH}
          loop={true}
          autoplay={true}
          onSnapToItem={this.onSnap}
        />
        <View style={style.indicatorContainer}>
          {data.map((item, index) => (
            <Indicator
              activeColor={this.props.theme.theme_colour}
              key={Math.random().toString()}
              active={index === this.state.currentIndex}
            />
          ))}
        </View>
        <View style={[GeneralStyle.container, GeneralStyle.noMarginTop]}>
          <Details
            heading={data[this.state.currentIndex].heading}
            message={data[this.state.currentIndex].message}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = store => ({theme: store.theme.appTheme});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppDetailsSlider);

const Indicator = props => (
  <View
    style={[
      style.indicator,
      props.active && {backgroundColor: props.activeColor},
    ]}></View>
);

const Details = props => (
  <View style={style.detailContainer}>
    {/* <View style={style.leftCutter}></View> */}
    <View>
      <Text style={style.heading}>{props.heading}</Text>
      <Text style={style.description}>{props.message}</Text>
    </View>
    {/* <View style={style.rightCutter}></View> */}
  </View>
);
