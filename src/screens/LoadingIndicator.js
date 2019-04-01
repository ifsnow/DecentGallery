// @flow

import React, { PureComponent } from 'react';

import {
  View,
  ActivityIndicator,
} from 'react-native';

import {
  StyleSheet,
} from '~/common';

type Props = {
  visible: boolean,
};

export default class LoadingIndicator extends PureComponent<Props> {
  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
