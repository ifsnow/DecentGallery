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
  TransformUtil,
} from '~/common';

type Props = {
  index: number,
  image: Object,
  onLoad?: (index: number) => void,
  onEnd?: (index: number) => void,
};

type State = {
  isReady: boolean,
  step: number,
};

const SECTION_HEIGHT = Math.round(Platform.windowHeight / 3);
const SECTION_3_POSITION = SECTION_HEIGHT * 2;
const SECTION_3_HEIGHT = Platform.windowHeight - SECTION_3_POSITION;
const SECTION_3_MINUS_HALF_HEIGHT = -1 * SECTION_3_HEIGHT / 2;

export default class VerticalTwoDevision extends PureComponent<Props, State> {
  _animationValue = new Animated.Value(0);

  _loadedImageCount = 0;

  _animationToValue = 1;

  _animationDuration = 800;

  _animationEasing: any = Easing.linear;

  _ref = React.createRef<Animated.View>();

  _step = 1;

  state = {
    isReady: false,
    step: 1,
  };

  constructor(props: Props) {
    super(props);

    this._animationValue.addListener(({ value }) => {
      this._transformFolding(value);
    });
  }

  _transformFolding(deg) {
    const matrix = TransformUtil.rotateX(deg, SECTION_3_MINUS_HALF_HEIGHT);

    this._ref.current && this._ref.current.setNativeProps({
      style: {
        transform: [
          {
            matrix,
          },
        ],
      },
    });
  }

  _onLoadFrontImage = () => {
    if (++this._loadedImageCount === 3) {
      this.props.onLoad && this.props.onLoad(this.props.index);
    }
  }

  ready() {
    this.setState({
      isReady: true,
    });
  }

  getBackPageAnimation() {
    return null;
  }

  run() {
    Animated.timing(this._animationValue, {
      toValue: -180,
      duration: this._animationDuration,
      easing: this._animationEasing,
      useNativeDriver: true,
      overshootClamping: true,
    }).start(() => {
      if (this.state.step === 3) {
        this.props.onEnd && this.props.onEnd(this.props.index);
        return;
      }

      this.setState(prevState => ({
        step: prevState.step + 1,
      }), () => {
        this._animationValue.setValue(0);
        this.run();
      });
    });
  }

  render() {
    if (!this.state.isReady) {
      return null;
    }

    const { image } = this.props;

    if (this.state.step === 1) {
      return (
        <React.Fragment>
          <Animated.View style={styles.section1}>
            <Image source={image} style={styles.image} onLoad={this._onLoadFrontImage} />
          </Animated.View>
          <Animated.View style={styles.section2}>
            <Image source={image} style={[styles.image, styles.imageIsSection2]} onLoad={this._onLoadFrontImage} />
          </Animated.View>
          <Animated.View style={styles.section3} ref={this._ref}>
            <Image source={image} style={[styles.image, styles.imageIsSection3]} onLoad={this._onLoadFrontImage} />
          </Animated.View>
        </React.Fragment>
      );
    }

    if (this.state.step === 2) {
      return (
        <React.Fragment>
          <Animated.View style={styles.section1}>
            <Image source={image} style={styles.image} />
          </Animated.View>
          <Animated.View style={styles.section2} ref={this._ref}>
            <Image source={image} style={[styles.image, styles.imageIsSection3, styles.imageIsRotated]} />
          </Animated.View>
        </React.Fragment>
      );
    }

    if (this.state.step === 3) {
      return (
        <React.Fragment>
          <Animated.View style={styles.section1} ref={this._ref}>
            <Image source={image} style={[styles.image, styles.imageIsSection3]} />
          </Animated.View>
        </React.Fragment>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  section1: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: SECTION_HEIGHT,
    overflow: 'hidden',
    zIndex: 1,
  },
  section2: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: SECTION_HEIGHT,
    height: SECTION_HEIGHT,
    overflow: 'hidden',
    zIndex: 2,
  },
  section3: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: SECTION_3_POSITION,
    height: SECTION_3_HEIGHT,
    overflow: 'hidden',
    zIndex: 3,
  },
  image: {
    width: Platform.windowWidth,
    height: Platform.windowHeight,
  },
  imageIsSection2: {
    marginTop: -1 * SECTION_HEIGHT,
  },
  imageIsSection3: {
    marginTop: -1 * SECTION_3_POSITION,
  },
  imageIsRotated: {
    transform: [{
      rotate: '180deg',
    }, {
      rotateY: '180deg',
    }, {
      translateY: -SECTION_3_POSITION,
    }],
  },
});
