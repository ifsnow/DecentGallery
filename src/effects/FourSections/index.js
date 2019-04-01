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
import EffectType3 from './EffectType3';

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

export default class FourSections extends PureComponent<Props, State> {
  _animationValue = new Animated.Value(0);

  _loadedImageCount = 0;

  _section1Style;

  _section2Style;

  _section3Style;

  _section4Style;

  _animationToValue = 4;

  _animationDuration = 1200;

  _animationEasing: any = Easing.linear;

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
      case EFFECT_TYPES.TYPE3:
        this._effect = new EffectType3(this, styles);
        break;
      default:
        throw new Error(`[Error] Undefined type. : ${String(effectType)}`);
    }

    this._effect.createAnimationStyles();
  }

  _onLoadFrontImage = () => {
    if (++this._loadedImageCount === 4) {
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
        <Animated.View style={this._section1Style}>
          <Image source={image} style={styles.image} onLoad={this._onLoadFrontImage} />
        </Animated.View>
        <Animated.View style={this._section2Style}>
          <Image source={image} style={[styles.image, styles.imageIsSection2]} onLoad={this._onLoadFrontImage} />
        </Animated.View>
        <Animated.View style={this._section3Style}>
          <Image source={image} style={[styles.image, styles.imageIsSection3]} onLoad={this._onLoadFrontImage} />
        </Animated.View>
        <Animated.View style={this._section4Style}>
          <Image source={image} style={[styles.image, styles.imageIsSection4]} onLoad={this._onLoadFrontImage} />
        </Animated.View>
      </React.Fragment>
    );
  }
}


const styles = StyleSheet.create({
  section1: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Platform.halfWindowWidth,
    height: Platform.halfWindowHeight,
    overflow: 'hidden',
  },
  section2: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: Platform.halfWindowWidth,
    height: Platform.halfWindowHeight,
    overflow: 'hidden',
  },
  section3: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: Platform.halfWindowWidth,
    height: Platform.halfWindowHeight,
    overflow: 'hidden',
  },
  section4: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: Platform.halfWindowWidth,
    height: Platform.halfWindowHeight,
    overflow: 'hidden',
  },
  image: {
    width: Platform.windowWidth,
    height: Platform.windowHeight,
  },
  imageIsSection2: {
    marginLeft: -1 * Platform.halfWindowWidth,
  },
  imageIsSection3: {
    marginTop: -1 * Platform.halfWindowHeight,
  },
  imageIsSection4: {
    marginLeft: -1 * Platform.halfWindowWidth,
    marginTop: -1 * Platform.halfWindowHeight,
  },
});
