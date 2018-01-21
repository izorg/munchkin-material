import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import Layout from '../../../../../components/Layout';
import Nobody from '../../../../../components/Nobody';

import AppBar from './AppBar';

const styles = {
  grid: {
    flex: 1,
  },
};

const TabletHomeScreenPage = ({ classes, empty }) => (
  <Layout>
    <AppBar />
    {empty ? <Nobody /> : (
      <Grid className={classes.grid} container spacing={0}>
        <Grid component={Paper} item sm={4}>
          Side
        </Grid>
        <Grid item sm={8}>
          Center
        </Grid>
      </Grid>
    )}
  </Layout>
);

TabletHomeScreenPage.propTypes = {
  empty: PropTypes.bool,
};

TabletHomeScreenPage.defaultProps = {
  empty: false,
};

export default withStyles(styles)(TabletHomeScreenPage);
