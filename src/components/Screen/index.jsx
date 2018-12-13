import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

import ScreenDialog from './Dialog';

let screenAppear = false;

class ScreenLoader extends Component {
  constructor(props) {
    super(props);

    const { loader } = props;

    this.loadableScreen = lazy(loader);
  }

  componentDidMount() {
    if (!screenAppear) {
      screenAppear = true;
    }
  }

  render() {
    const LazyComponent = this.loadableScreen;
    const { appear: appearProp, match } = this.props;

    const appear = appearProp !== undefined ? appearProp : screenAppear;

    return (
      <ScreenDialog open={Boolean(match)} TransitionProps={{ appear }}>
        <Suspense fallback={null}>
          <LazyComponent {...this.props} />
        </Suspense>
      </ScreenDialog>
    );
  }
}

ScreenLoader.propTypes = {
  loader: PropTypes.func.isRequired,
  match: PropTypes.object,
};

ScreenLoader.defaultProps = {
  match: null,
};

export default ScreenLoader;
