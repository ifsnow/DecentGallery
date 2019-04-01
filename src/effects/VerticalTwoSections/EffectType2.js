// @flow
import {
  Easing,
} from 'react-native';

// Two sections open in the left and right direction.

import {
  Platform,
} from '~/common';

export default class EffectType2 {
  _context;

  _styles;

  constructor(context: any, styles: any) {
    this._context = context;
    this._styles = styles;
  }

  createAnimationStyles() {
    this._context._animationEasing = Easing.back(1.2);

    this._context._topStyle = [
      this._styles.top,
      {
        transform: [{
          translateX: this._context._animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -1 * Platform.windowWidth],
          }),
        }],
      },
    ];

    this._context._bottomStyle = [
      this._styles.bottom,
      {
        transform: [{
          translateX: this._context._animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Platform.windowWidth],
          }),
        }],
      },
    ];
  }

  getBackPageAnimation() {
    return null;
  }
}
