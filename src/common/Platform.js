// @flow

import {
  Dimensions,
  Platform as NativePlatform,
} from 'react-native';

const {
  width: windowWidth,
  height: windowHeight,
} = Dimensions.get('window');

const isAndroid = NativePlatform.OS === 'android';
const isIOS = !isAndroid;

const halfWindowWidth = windowWidth / 2;
const halfWindowHeight = windowHeight / 2;

export const Platform = {
  isAndroid,
  isIOS,
  windowWidth,
  windowHeight,
  halfWindowWidth,
  halfWindowHeight,
};
