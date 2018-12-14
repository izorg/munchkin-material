import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

import ScreenDialog from './Dialog';
import Loading from './Loading';

let screenAppear = false;

class ScreenLoader extends Component {
  constructor(props) {
    super(props);

    this.component = lazy(props.loader);
  }

  componentDidMount() {
    if (!screenAppear) {
      screenAppear = true;
    }
  }

  render() {
    const { appear: appearProp, match, ...rest } = this.props;

    const appear = appearProp !== undefined ? appearProp : screenAppear;

    const LazyComponent = this.component;

    return (
      <ScreenDialog open={Boolean(match)} TransitionProps={{ appear }}>
        <Suspense fallback={<Loading />}>
          <LazyComponent match={match} {...rest} />
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
