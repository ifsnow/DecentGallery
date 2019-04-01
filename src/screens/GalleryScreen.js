// @flow

import React, { PureComponent } from 'react';

import {
  View,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  StyleSheet,
  StatusBar,
} from '~/common';

import {
  EFFECTS,
  type Effects,
  type EffectTypes,
} from '~/types';

import VerticalTwoSections from '~/effects/VerticalTwoSections';
import HorizontalTwoSections from '~/effects/HorizontalTwoSections';
import VerticalThreeFolding from '~/effects/VerticalThreeFolding';
import FourSections from '~/effects/FourSections';

import LoadingIndicator from './LoadingIndicator';

type PageType = {
  effect: Effects,
  effectType?: EffectTypes,
  image: Object,
  run: () => void,
};

type Props = {
  pages: PageType[],
};

type State = {
  currentPageIndex: number,
  backPageAnimation: ?any,
  isLoading: boolean,
}

const EFFECT_TO_COMPONENT = {
  [EFFECTS.VERTICAL_TWO_SECTIONS]: VerticalTwoSections,
  [EFFECTS.HORIZONTAL_TWO_SECTIONS]: HorizontalTwoSections,
  [EFFECTS.VERTICAL_THREE_FOLDING]: VerticalThreeFolding,
  [EFFECTS.FOUR_SECTIONS]: FourSections,
};

export class GalleryScreen extends PureComponent<Props, State> {
  _pages = [];

  _refs: any[] = [];

  _currentWorkingPageIndex = -1;

  _hasPenddingRequest = false;

  _isNextPageLoaded = false;

  _lastPageIndex = 0;

  state = {
    currentPageIndex: 0,
    backPageAnimation: null,
    isLoading: false,
  };

  componentWillMount() {
    StatusBar.hide(false);

    this._lastPageIndex = this.props.pages.length - 1;

    this.props.pages.forEach((page: PageType, index) => {
      const PageComponent = EFFECT_TO_COMPONENT[page.effect];
      if (!PageComponent) {
        return;
      }

      this._pages.push((
        <PageComponent
          key={`page-${index}`}
          index={index}
          effectType={page?.effectType}
          ref={this._setRef(index)}
          image={page.image}
          onLoad={this._onLoad}
          onEnd={this._onEnd}
        />
      ));
    });
  }

  componentDidMount() {
    const { currentPageIndex } = this.state;
    this._refs[currentPageIndex] && this._refs[currentPageIndex].ready();
  }

  componentWillUnmount() {
    StatusBar.show(false);
  }

  _setRef = (index: number) => ref => this._refs[index] = ref;

  _onLoad = (index: number) => {
    const { currentPageIndex } = this.state;
    const nextPageIndex = currentPageIndex + 1;

    if (index === nextPageIndex) {
      this._isNextPageLoaded = true;
      return;
    }

    this._refs[nextPageIndex] && this._refs[nextPageIndex].ready();
  };

  _onEnd = (index: number) => {
    const currentPageIndex = index + 1;

    this.setState({
      currentPageIndex,
    }, () => {
      this._currentWorkingPageIndex = -1;

      const nextPageIndex = currentPageIndex + 1;
      this._refs[nextPageIndex] && this._refs[nextPageIndex].ready();

      if (this._hasPenddingRequest) {
        this._hasPenddingRequest = false;
        this._onPress();
      }
    });
  }

  _onPress = () => {
    if (this._hasPenddingRequest || this.state.isLoading) {
      return;
    }

    const { currentPageIndex } = this.state;

    if (currentPageIndex === this._lastPageIndex) {
      alert('This is the last page.');
      return;
    }

    if (this._currentWorkingPageIndex === currentPageIndex) {
      this._hasPenddingRequest = true;
      return;
    }

    this._currentWorkingPageIndex = currentPageIndex;

    this._runPage();
  }

  _runPage = () => {
    const { currentPageIndex } = this.state;

    const page = this._refs[currentPageIndex];
    if (!page) {
      return;
    }

    const isLastPage = currentPageIndex === this._lastPageIndex;

    if (!isLastPage && !this._isNextPageLoaded) {
      this.setState({
        isLoading: true,
      });

      setTimeout(this._runPage, 100);
      return;
    }

    this._isNextPageLoaded = false;

    this.setState({
      isLoading: false,
      backPageAnimation: page.getBackPageAnimation(),
    }, () => {
      page.run();
    });
  }

  render() {
    const {
      currentPageIndex,
      backPageAnimation,
      isLoading,
    } = this.state;

    let firstViewPage = null;
    let secondViewPage = null;

    const firstViewStyle = [];
    const secondViewStyle = [];

    if (currentPageIndex % 2 === 0) {
      firstViewStyle.push(styles.back, backPageAnimation);
      secondViewStyle.push(styles.front);

      firstViewPage = this._pages[currentPageIndex + 1];
      secondViewPage = this._pages[currentPageIndex];
    } else {
      firstViewStyle.push(styles.front);
      secondViewStyle.push(styles.back, backPageAnimation);

      firstViewPage = this._pages[currentPageIndex];
      secondViewPage = this._pages[currentPageIndex + 1];
    }

    return (
      <TouchableWithoutFeedback onPress={this._onPress}>
        <View style={styles.container}>
          <Animated.View style={firstViewStyle}>
            {firstViewPage}
          </Animated.View>

          <Animated.View style={secondViewStyle}>
            {secondViewPage}
          </Animated.View>

          <LoadingIndicator visible={isLoading} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  front: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
  back: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});
