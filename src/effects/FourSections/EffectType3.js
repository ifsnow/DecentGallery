// @flow

// Four sections disappear by decreasing one by one.

export default class EffectType3 {
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
        opacity: this._context._animationValue.interpolate({
          inputRange: [0, 0.9, 1],
          outputRange: [1, 0.8, 0],
          extrapolate: 'clamp',
        }),
        transform: [
          {
            scale: this._context._animationValue.interpolate({
              inputRange: [0, 0.2, 1],
              outputRange: [1, 1.1, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    ];

    this._context._section2Style = [
      this._styles.section2,
      {
        opacity: this._context._animationValue.interpolate({
          inputRange: [2, 2.9, 3],
          outputRange: [1, 0.8, 0],
          extrapolate: 'clamp',
        }),
        transform: [
          {
            scale: this._context._animationValue.interpolate({
              inputRange: [2, 2.2, 3],
              outputRange: [1, 1.1, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    ];

    this._context._section3Style = [
      this._styles.section3,
      {
        opacity: this._context._animationValue.interpolate({
          inputRange: [3, 3.9, 4],
          outputRange: [1, 0.8, 0],
          extrapolate: 'clamp',
        }),
        transform: [
          {
            scale: this._context._animationValue.interpolate({
              inputRange: [3, 3.2, 4],
              outputRange: [1, 1.1, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    ];

    this._context._section4Style = [
      this._styles.section4,
      {
        opacity: this._context._animationValue.interpolate({
          inputRange: [1, 1.9, 2],
          outputRange: [1, 0.8, 0],
          extrapolate: 'clamp',
        }),
        transform: [
          {
            scale: this._context._animationValue.interpolate({
              inputRange: [1, 1.2, 2],
              outputRange: [1, 1.1, 0],
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
