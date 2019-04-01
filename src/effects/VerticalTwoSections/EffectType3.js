// @flow

// Two sections rotate in turn and disappear.

import {
  Easing,
} from 'react-native';

export default class EffectType3 {
  _context;

  _styles;

  constructor(context: any, styles: any) {
    this._context = context;
    this._styles = styles;
  }

  createAnimationStyles() {
    this._context._animationToValue = 2;
    this._context._animationEasing = Easing.linear;

    this._context._topStyle = [
      this._styles.top,
      {
        opacity: this._context._animationValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 0.3, 0],
        }),
        transform: [
          {
            scale: this._context._animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
          {
            rotate: this._context._animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            }),
          },
        ],
      },
    ];

    this._context._bottomStyle = [
      this._styles.bottom,
      {
        opacity: this._context._animationValue.interpolate({
          inputRange: [0, 1, 1.5, 2],
          outputRange: [1, 1, 0.3, 0],
        }),
        transform: [
          {
            scale: this._context._animationValue.interpolate({
              inputRange: [0, 0.8, 2],
              outputRange: [1, 0.9, 0],
            }),
          },
          {
            rotate: this._context._animationValue.interpolate({
              inputRange: [0, 0.8, 2],
              outputRange: ['0deg', '30deg', '360deg'],
            }),
          },
        ],
      },
    ];
  }

  getBackPageAnimation() {
    return null;
  }
}
