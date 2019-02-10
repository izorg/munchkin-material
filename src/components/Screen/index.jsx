import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

import Loading from '../Loading';

import ScreenModal from './Modal';

let screenAppear = false;

class Screen extends Component {
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

Screen.propTypes = {
  appear: PropTypes.bool,
  loader: PropTypes.func.isRequired,
  match: PropTypes.object,
};

Screen.defaultProps = {
  appear: undefined,
  match: null,
};

export default Screen;
