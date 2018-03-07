import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import Transition from '../../../components/fab/Transition';

import Page from './Page';
import PlayerAddButton from './PlayerAddButton';

class HomeScreen extends PureComponent {
  render() {
    const { match } = this.props;

    return (
      <Fragment>
        <Page />
        <Transition
          appear={false}
          in={Boolean(match) && match.isExact && !match.params.mode}
        >
          <PlayerAddButton />
        </Transition>
      </Fragment>
    );
  }
}

HomeScreen.propTypes = {
  match: PropTypes.object,
};

HomeScreen.defaultProps = {
  match: null,
};

export default HomeScreen;
