// @flow

// Two sections open like doors.

import {
  Platform,
  TransformUtil,
} from '~/common';

export default class EffectType2 {
  _context;

  _styles;

  constructor(context: any, styles: any) {
    this._context = context;
    this._styles = styles;
  }

  createAnimationStyles() {
    this._context._animationToValue = -180;
    this._context._animationDuration = 1700;

    this._context._leftAnimationStyle = this._styles.left;
    this._context._rightAnimationStyle = this._styles.right;

    this._context._animationValue.addListener(({ value }) => {
      this._transformOpenDoor(value);
    });
  }

  _transformOpenDoor(deg) {
    const leftMatrix = TransformUtil.rotateY(deg, -1 * Platform.halfWindowWidth);
    const rightMatrix = TransformUtil.rotateY(-1 * deg, Platform.halfWindowWidth);

    this._context._leftRef.current && this._context._leftRef.current.setNativeProps({
      style: {
        transform: [
          {
            matrix: leftMatrix,
          },
        ],
      },
    });

    this._context._rightRef.current && this._context._rightRef.current.setNativeProps({
      style: {
        transform: [
          {
            matrix: rightMatrix,
          },
        ],
      },
    });
  }

  getBackPageAnimation() {
    const backPageAnimation = {
      opacity: this._context._animationValue.interpolate({
        inputRange: [-180, 0],
        outputRange: [1, 0.7],
      }),
      transform: [{
        scale: this._context._animationValue.interpolate({
          inputRange: [-180, -90, 0],
          outputRange: [1, 1.1, 1],
        }),
      }],
    };

    return backPageAnimation;
  }
}
