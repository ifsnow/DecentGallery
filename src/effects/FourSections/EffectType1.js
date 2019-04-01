// @flow

// Four sections disappear in turn.

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
    this._context._section1Style = [
      this._styles.section1,
      {
        transform: [
          {
            translateX: this._context._animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -1 * (Platform.windowWidth + 100)],
              extrapolate: 'clamp',
            }),
          },
          {
            rotate: this._context._animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '30deg'],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    ];

    this._context._section2Style = [
      this._styles.section2,
      {
        transform: [
          {
            translateX: this._context._animationValue.interpolate({
              inputRange: [1, 2],
              outputRange: [0, Platform.windowWidth + 100],
              extrapolate: 'clamp',
            }),
          },
          {
            rotate: this._context._animationValue.interpolate({
              inputRange: [1, 2],
              outputRange: ['0deg', '-30deg'],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    ];

    this._context._section3Style = [
      this._styles.section3,
      {
        transform: [
          {
            translateX: this._context._animationValue.interpolate({
              inputRange: [2, 3],
              outputRange: [0, -1 * (Platform.windowWidth + 100)],
              extrapolate: 'clamp',
            }),
          },
          {
            rotate: this._context._animationValue.interpolate({
              inputRange: [2, 3],
              outputRange: ['0deg', '30deg'],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    ];

    this._context._section4Style = [
      this._styles.section4,
      {
        transform: [
          {
            translateX: this._context._animationValue.interpolate({
              inputRange: [3, 4],
              outputRange: [0, Platform.windowWidth + 100],
              extrapolate: 'clamp',
            }),
          },
          {
            rotate: this._context._animationValue.interpolate({
              inputRange: [3, 4],
              outputRange: ['0deg', '-30deg'],
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
