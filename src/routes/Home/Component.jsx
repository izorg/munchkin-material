import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Zoom from '@material-ui/core/Zoom';

import modeShape from './modeShape';

import Page from './Page';
import PlayerAddButton from './PlayerAddButton';

const Home = ({ fabAppear, match, mode, singleMode, theme }) => {
  const inProp = Boolean(match) && match.isExact && !mode && !singleMode;

  return (
    <Fragment>
      <Page mode={mode} singleMode={singleMode} />
      <Zoom
        appear={fabAppear}
        in={inProp}
        style={{
          transitionDelay: inProp
            ? theme.transitions.duration.leavingScreen
            : 0,
        }}
      >
        <PlayerAddButton />
      </Zoom>
    </Fragment>
  );
};

Home.propTypes = {
  fabAppear: PropTypes.bool.isRequired,
  match: PropTypes.object,
  mode: modeShape,
  singleMode: PropTypes.bool,
};

Home.defaultProps = {
  match: null,
  mode: undefined,
  singleMode: false,
};

export default Home;
