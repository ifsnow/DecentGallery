// @flow

// Four sections overlap and disappear.

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
    this._context._animationToValue = 4.6;
    this._context._animationDuration = 1500;

    this._context._section1Style = [
      this._styles.section1,
      {
        zIndex: 1,
        opacity: this._context._animationValue.interpolate({
          inputRange: [1, 1.001],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
        transform: [
          {
            translateX: this._context._animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, Platform.halfWindowWidth],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    ];

    this._context._section2Style = [
      this._styles.section2,
      {
        zIndex: 2,
        opacity: this._context._animationValue.interpolate({
          inputRange: [2.2, 2.201],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
        transform: [
          {
            translateY: this._context._animationValue.interpolate({
              inputRange: [1.2, 2.2],
              outputRange: [0, Platform.halfWindowHeight],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    ];

    this._context._section3Style = [
      this._styles.section3,
      {
        zIndex: 4,
        transform: [
          {
            translateX: this._context._animationValue.interpolate({
              inputRange: [3.6, 4.6],
              outputRange: [0, -1 * Platform.halfWindowWidth],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    ];

    this._context._section4Style = [
      this._styles.section4,
      {
        zIndex: 3,
        opacity: this._context._animationValue.interpolate({
          inputRange: [3.4, 3.401],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
        transform: [
          {
            translateX: this._context._animationValue.interpolate({
              inputRange: [2.4, 3.4],
              outputRange: [0, -1 * Platform.halfWindowWidth],
              extrapolate: 'clamp',
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
