// @flow

import React, { PureComponent } from 'react';

import {
  GalleryScreen,
} from '~/screens';

import pages from './DummyPages';

export default class App extends PureComponent<{}> {
  render() {
    return (
      <GalleryScreen pages={pages} />
    );
  }
}
