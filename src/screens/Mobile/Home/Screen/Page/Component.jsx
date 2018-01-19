import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import cns from 'classnames';

import Layout, { LayoutContent, LayoutHeader } from '../../../../../components/Layout';
import { classesObject } from '../../../../../utils/propTypes';

import AppBar from './AppBar';
import Empty from './Empty';
import PlayerList from './PlayerList';

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },

  empty: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

const HomeScreenPage = ({ classes, empty }) => (
  <Layout>
    <LayoutHeader>
      <AppBar />
    </LayoutHeader>
    <LayoutContent className={cns(classes.content, { [classes.empty]: empty })}>
      {empty ? (
        <Empty />
      ) : (
        <PlayerList />
      )}
    </LayoutContent>
  </Layout>
);

HomeScreenPage.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  empty: PropTypes.bool,
};

HomeScreenPage.defaultProps = {
  empty: false,
};

export default withStyles(styles)(HomeScreenPage);
