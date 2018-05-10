import React, { Fragment, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import Nobody from '../../../../components/Nobody';

import AppBar from './AppBar';
import MenuDrawer from './MenuDrawer';
import PlayerList from './PlayerList';
import SinglePlayer from './SinglePlayer';
import ThemeDialog from './ThemeDialog';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },

  content: {
    flex: 1,
    overflowY: 'auto',
    touchAction: 'pan-y',
  },

  listContainer: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
      margin: '0 auto',
    },
  },

  list: {
    paddingBottom: 56,

    [theme.breakpoints.up('sm')]: {
      paddingBottom: 0,
    },
  },
});

class Component extends PureComponent {
  constructor(props) {
    super(props);

    this.handleContainer = this.handleContainer.bind(this);
  }

  handleContainer() {
    // eslint-disable-next-line react/no-find-dom-node
    return findDOMNode(this).querySelector('[data-container]');
  }

  render() {
    const { classes, empty, menu, singleMode } = this.props;

    let content;

    if (singleMode) {
      content = <SinglePlayer />;
    } else if (empty) {
      content = <Nobody />;
    } else {
      content = (
        <div className={classes.content} data-container>
          <Paper className={classes.listContainer}>
            <PlayerList
              className={classes.list}
              getContainer={this.handleContainer}
            />
          </Paper>
        </div>
      );
    }

    return (
      <Fragment>
        <div className={classes.root}>
          <AppBar />
          {content}
        </div>
        {menu && <MenuDrawer />}
        <ThemeDialog />
      </Fragment>
    );
  }
}

Component.propTypes = {
  empty: PropTypes.bool,
  menu: PropTypes.bool,
  singleMode: PropTypes.bool,
};

Component.defaultProps = {
  empty: false,
  menu: false,
  singleMode: false,
};

export default withStyles(styles)(Component);
