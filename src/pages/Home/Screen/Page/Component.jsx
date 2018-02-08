import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Layout from '../../../../components/Layout';
import Nobody from '../../../../components/Nobody';

import AppBar from './AppBar';
import MenuDrawer from './MenuDrawer';
import PlayerList from './PlayerList';

const HomeScreenPageComponent = ({ empty }) => (
  <Fragment>
    <Layout>
      <AppBar />
      {empty ? <Nobody /> : <PlayerList />}
    </Layout>
    <MenuDrawer />
  </Fragment>
);

HomeScreenPageComponent.propTypes = {
  empty: PropTypes.bool,
};

HomeScreenPageComponent.defaultProps = {
  empty: false,
};

export default HomeScreenPageComponent;
