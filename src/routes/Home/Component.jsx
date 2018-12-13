import React from 'react';
import PropTypes from 'prop-types';

import Zoom from '../../components/transitions/Zoom';

import modeShape from './modeShape';

import Page from './Page';
import PlayerAddButton from './PlayerAddButton';

const Home = ({ match, mode, singleMode }) => (
  <>
    <Page mode={mode} singleMode={singleMode} />
    <Zoom appear={false} in={Boolean(match) && !mode && !singleMode}>
      <PlayerAddButton />
    </Zoom>
  </>
);

Home.propTypes = {
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
