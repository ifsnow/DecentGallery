// @flow

// Two sections open in the left and right direction.

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
    this._context._leftAnimationStyle = [
      this._styles.left,
      {
        transform: [{
          translateX: this._context._animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -1 * Platform.halfWindowWidth],
          }),
        }],
      },
    ];

    this._context._rightAnimationStyle = [
      this._styles.right,
      {
        transform: [{
          translateX: this._context._animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Platform.halfWindowWidth],
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
        }),
      }],
    };

    return backPageAnimation;
  }
}
