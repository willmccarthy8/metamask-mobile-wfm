import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View } from 'react-native';
import { baseStyles } from '../../../styles/common';

/**
 * Base view component providing consistent styling meant to wrap other views
 */
interface ScreenProps {
  children?: React.ReactNode;
}

export default class Screen extends PureComponent<ScreenProps> {
  static propTypes = {
    /**
     * Content to wrap inside this view
     */
    children: PropTypes.node,
  };

  render() {
    return (
      <View style={baseStyles.flexGrow}>
        <SafeAreaView style={baseStyles.flexGrow}>
          {this.props.children}
        </SafeAreaView>
      </View>
    );
  }
}
