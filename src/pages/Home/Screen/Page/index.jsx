import React from 'react';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

import Layout from '../../../../components/Layout';
import Nobody from '../../../../components/Nobody';

import AppBar from './AppBar';
import PlayerList from './PlayerList';

const mapStateToProps = state => ({ empty: !state.playerList.length });

const MobileHomeScreenPage = ({ empty }) => (
  <Layout>
    <AppBar />
    {empty ? <Nobody /> : <PlayerList />}
  </Layout>
);

MobileHomeScreenPage.propTypes = {
  empty: PropTypes.bool,
};

MobileHomeScreenPage.defaultProps = {
  empty: false,
};

export default connect(mapStateToProps)(MobileHomeScreenPage);
