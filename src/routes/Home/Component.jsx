import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Zoom from '@material-ui/core/Zoom';
import { withTheme } from '@material-ui/core/styles';

import Page from './Page';
import PlayerAddButton from './PlayerAddButton';

const Home = ({ in: inProp, theme }) => (
  <Fragment>
    <Page />
    <Zoom
      appear={false}
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
  in: PropTypes.bool,
};

Home.defaultProps = {
  in: false,
};

export default withTheme()(Home);
