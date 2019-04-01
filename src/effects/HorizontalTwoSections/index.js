// @flow

import React, { PureComponent } from 'react';
import {
  Animated,
  Image,
  Easing,
} from 'react-native';

import {
  StyleSheet,
  Platform,
} from '~/common';

import EffectType1 from './EffectType1';
import EffectType2 from './EffectType2';

import {
  EFFECT_TYPES,
  type EffectTypes,
} from '~/types';

type Props = {
  index: number,
  image: Object,
  effectType: ?EffectTypes,
  onLoad?: (index: number) => void,
  onEnd?: (index: number) => void,
};

type State = {
  isReady: boolean,
};

export default class HorizontalTwoSections extends PureComponent<Props, State> {
  _animationValue = new Animated.Value(0);

  _leftRef = React.createRef<Animated.View>();

  _rightRef = React.createRef<Animated.View>();

  _loadedImageCount = 0;

  _leftAnimationStyle;

  _rightAnimationStyle;

  _animationToValue = 1;

  _animationDuration = 1000;

  _animationEasing: any = Easing.bounce;

  _effect;

  state = {
    isReady: false,
  };

  constructor(props: Props) {
    super(props);

    const {
      effectType,
    } = this.props;

    switch (effectType) {
      case EFFECT_TYPES.TYPE1:
        this._effect = new EffectType1(this, styles);
        break;
      case EFFECT_TYPES.TYPE2:
        this._effect = new EffectType2(this, styles);
        break;
      default:
        throw new Error(`[Error] Undefined type. : ${String(effectType)}`);
    }

    this._effect.createAnimationStyles();
  }

  _onLoadFrontImage = () => {
    if (++this._loadedImageCount === 2) {
      this.props.onLoad && this.props.onLoad(this.props.index);
    }
  }

  ready() {
    this.setState({
      isReady: true,
    });
  }

  getBackPageAnimation() {
    return this._effect.getBackPageAnimation();
  }

  run() {
    Animated.timing(this._animationValue, {
      toValue: this._animationToValue,
      duration: this._animationDuration,
      easing: this._animationEasing,
      useNativeDriver: true,
      overshootClamping: true,
    }).start(() => {
      this.props.onEnd && this.props.onEnd(this.props.index);
    });
  }

  render() {
    if (!this.state.isReady) {
      return null;
    }

    const { image } = this.props;

    return (
      <React.Fragment>
        <Animated.View style={this._leftAnimationStyle} ref={this._leftRef}>
          <Image source={image} style={styles.image} onLoad={this._onLoadFrontImage} />
        </Animated.View>
        <Animated.View style={this._rightAnimationStyle} ref={this._rightRef}>
          <Image source={image} style={[styles.image, styles.imageIsRight]} onLoad={this._onLoadFrontImage} />
        </Animated.View>
      </React.Fragment>
    );
  }
}


const styles = StyleSheet.create({
  left: {
    position: 'absolute',
    left: 0,
    right: Platform.halfWindowWidth,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  right: {
    position: 'absolute',
    left: Platform.halfWindowWidth,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  image: {
    width: Platform.windowWidth,
    height: Platform.windowHeight,
  },
  imageIsRight: {
    marginLeft: -1 * Platform.halfWindowWidth,
  },
});
