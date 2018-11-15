import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Zoom from '@material-ui/core/Zoom';

import Page from './Page';
import PlayerAddButton from './PlayerAddButton';

const Home = ({ fabAppear, in: inProp, theme }) => (
  <Fragment>
    <Page />
    <Zoom
      appear={fabAppear}
      in={inProp}
      style={{
        transitionDelay: inProp ? theme.transitions.duration.leavingScreen : 0,
      }}
    >
      <PlayerAddButton />
    </Zoom>
  </Fragment>
);

Home.propTypes = {
  fabAppear: PropTypes.bool.isRequired,
  in: PropTypes.bool,
};

Home.defaultProps = {
  in: false,
};

export default Home;
