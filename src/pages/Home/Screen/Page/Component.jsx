import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../../../../components/Layout';
import Nobody from '../../../../components/Nobody';

import AppBar from './AppBar';
import PlayerList from './PlayerList';

const HomeScreenPageComponent = ({ empty }) => (
  <Layout>
    <AppBar />
    {empty ? <Nobody /> : <PlayerList />}
  </Layout>
);

HomeScreenPageComponent.propTypes = {
  empty: PropTypes.bool,
};

HomeScreenPageComponent.defaultProps = {
  empty: false,
};

export default HomeScreenPageComponent;
