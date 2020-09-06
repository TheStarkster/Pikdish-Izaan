import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import StarRating from 'react-native-star-rating';

import colors from '../../config/colors';
import constants from '../../config/constants';

const Rating = props => {
  return (
    <View style={style.container}>
      <Text style={style.text}>RATE YOUR EXPERIENCE</Text>
      <View style={style.starContainer}>
        <StarRating
          halfStarEnabled={true}
          fullStarColor={colors.GOLDEN}
          disabled={false}
          maxStars={5}
          starSize={constants.WINDOW_WIDTH * 0.05}
          rating={props.rating}
          selectedStar={rating => props.onRatingChange(rating)}
        />
      </View>
    </View>
  );
};

Rating.defaultProps = {
  rating: 0,
  onRatingChange: function() {},
};

export default Rating;

const style = StyleSheet.create({
  container: {
    marginTop: constants.MARGIN_SMALL * 1.3,
    borderColor: colors.GREY,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingVertical: constants.PADDING_VERTICAL_MEDIUM * 0.8,
  },
  text: {
    fontSize: constants.FONT_X_SMALL,
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
  },
  starContainer: {
    marginTop: constants.MARGIN_X_SMALL,
    width: constants.WINDOW_WIDTH * 0.36,
    alignSelf: 'center',
  },
});
