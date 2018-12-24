import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

import Loading from '../Loading';

import ScreenModal from './Modal';

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
      <ScreenModal appear={appear} open={Boolean(match)}>
        <Suspense fallback={<Loading />}>
          <LazyComponent match={match} {...rest} />
        </Suspense>
      </ScreenModal>
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
