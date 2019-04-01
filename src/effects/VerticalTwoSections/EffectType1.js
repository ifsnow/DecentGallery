// @flow

// Two sections open up and down.

import {
  Platform,
} from '~/common';

export default class EffectType1 {
  _context;

  _styles;

  constructor(context: any, styles: any) {
    this._context = context;
    this._styles = styles;
  }

  createAnimationStyles() {
    this._context._topStyle = [
      this._styles.top,
      {
        transform: [{
          translateY: this._context._animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -1 * Platform.halfWindowHeight],
          }),
        }],
      },
    ];

    this._context._bottomStyle = [
      this._styles.bottom,
      {
        transform: [{
          translateY: this._context._animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Platform.halfWindowHeight],
          }),
        }],
      },
    ];
  }

  getBackPageAnimation() {
    const backPageAnimation = {
      opacity: this._context._animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.7, 1],
      }),
      transform: [{
        scale: this._context._animationValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.1, 1],
          extrapolate: 'clamp',
        }),
      }],
    };

    return backPageAnimation;
  }
}
