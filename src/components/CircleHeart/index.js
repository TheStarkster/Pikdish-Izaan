import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import style from './style';

const CircleHeart = props => {
  const [active, setActive] = useState(props.active);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  function handlePress() {
    if (props.onPress) return props.onPress();

    setActive(!active);
    props.onPress();
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[style.container, props.containerStyles]}>
        {active ? (
          <Image
            resizeMode="contain"
            style={style.image}
            source={require('../../assets/icon/fav-active.png')}
          />
        ) : (
          <Image
            resizeMode="contain"
            style={style.image}
            source={require('../../assets/icon/fav.png')}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

CircleHeart.defaultProps = {
  active: false,
  onPress: function() {},
};

export default CircleHeart;
