import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Transition from '../../../components/fab/Transition';

import Page from './Page';
import PlayerAddButton from './PlayerAddButton';

class HomeScreen extends PureComponent {
  render() {
    const { match, singleMode } = this.props;

    return (
      <Fragment>
        <Page />
        <Transition
          appear={false}
          in={
            Boolean(match) && match.isExact && !match.params.mode && !singleMode
          }
        >
          <PlayerAddButton />
        </Transition>
      </Fragment>
    );
  }
}

HomeScreen.propTypes = {
  match: PropTypes.object,
  singleMode: PropTypes.bool,
};

HomeScreen.defaultProps = {
  match: null,
  singleMode: false,
};

const mapStateToProps = (state) => ({
  singleMode: state.app.singleMode,
});

export default connect(mapStateToProps)(HomeScreen);
