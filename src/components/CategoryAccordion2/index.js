import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';

import style from './style';

class CategoryAccordion2 extends Component {
  state = {
    collapsed: this.props.collapsed,
  };

  componentDidUpdate(prevProps) {
    const {collapsed} = this.props;
    const {collapsed: prevCollapsed} = prevProps;

    if (collapsed !== prevCollapsed) {
      this.setState({collapsed});
    }
  }

  handlePress = () => {
    const {collapsed} = this.state;

    this.props.onPress();

    this.setState({collapsed: !collapsed});
  };

  render() {
    return (
      <View style={this.props.containerStyles}>
        <TouchableOpacity onPress={this.handlePress}>
          {this.props.header}
        </TouchableOpacity>
        <Collapsible
          duration={this.props.duration}
          collapsed={this.state.collapsed}>
          {this.props.children}
        </Collapsible>
      </View>
    );
  }
}

CategoryAccordion2.defaultProps = {
  collapsed: true,
  duration: 0,
  onPress: function() {},
};

export default CategoryAccordion2;
