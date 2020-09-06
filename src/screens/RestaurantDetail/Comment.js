import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import constants from '../../config/constants';
import colors from '../../config/colors';
import Avatar from '../../components/Avatar';
import GeneralStyle from '../GeneralStyle';

const Comment = props => (
  <View style={style.container}>
    <View style={style.userContainer}>
      <Avatar style={style.avatar} />
      <View style={style.usernameContainer}>
        <Text style={style.username}>{props.data.name}</Text>
        <View style={[GeneralStyle.flexRow, GeneralStyle.alignCenter]}>
          <Text style={style.rating}>{props.data.rating}</Text>
          <Icon color={colors.GOLDEN} size={style.star.width} name="star" />
        </View>
      </View>
    </View>
    <View style={style.commentContainer}>
      <Text style={style.comment}>{props.data.feedback_text}</Text>
    </View>
  </View>
);

export default Comment;

const style = StyleSheet.create({
  container: {
    paddingVertical: constants.PADDING_VERTICAL_MEDIUM * 1.3,
    borderColor: colors.GREY,
    borderBottomWidth: 1,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: constants.WINDOW_WIDTH * 0.16,
    height: constants.WINDOW_WIDTH * 0.16,
  },
  usernameContainer: {
    marginLeft: constants.MARGIN_SMALL,
  },
  username: {
    fontSize: constants.FONT_SMALL * 1.3,
    fontFamily: 'Nunito-Bold',
  },
  rating: {
    fontFamily: 'Nunito-Regular',
    lineHeight: 10,
    fontSize: constants.FONT_SMALL * 0.8,
    marginRight: constants.MARGIN_X_SMALL,
  },
  star: {
    width: constants.WINDOW_WIDTH * 0.03,
    backgroundColor: 'red',
  },
  commentContainer: {
    marginTop: constants.MARGIN_SMALL,
  },
  comment: {
    fontFamily: 'Nunito-Regular',
    fontSize: constants.FONT_X_SMALL,
  },
});
