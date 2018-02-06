import React from 'react';
import { withStyles } from 'material-ui/styles';

import Layout, { LayoutContent } from '../../../components/Layout';

import AppBar from './AppBar';
import Form from './Form';

const styles = (theme) => ({
  content: {
    ...theme.mixins.gutters({}),

    overflowY: 'auto',
  },
});

const PlayerFormScreenComponent = ({ classes }) => (
  <Layout>
    <AppBar />
    <LayoutContent className={classes.content}>
      <Form />
    </LayoutContent>
  </Layout>
);

export default withStyles(styles)(PlayerFormScreenComponent);
