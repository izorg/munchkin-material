import React, { createRef, Fragment, PureComponent } from 'react';
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
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    overflowY: 'auto',
    touchAction: 'pan-y',
  },

  listContainer: {
    flex: 1,
    paddingBottom: 48,

    [theme.breakpoints.up('sm')]: {
      flex: 'none',
      margin: '0 auto',
      paddingBottom: 0,
      width: 400,
    },
  },
});

class Component extends PureComponent {
  constructor(props) {
    super(props);

    this.contentRef = createRef();
  }

  componentDidUpdate(prevProps) {
    const node = this.contentRef.current;

    if (this.props.playerCount > prevProps.playerCount) {
      node.scrollTop = node.scrollHeight;
    }
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
        <div className={classes.content} ref={this.contentRef}>
          <Paper className={classes.listContainer}>
            <PlayerList />
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
  playerCount: PropTypes.number,
  singleMode: PropTypes.bool,
};

Component.defaultProps = {
  empty: false,
  menu: false,
  playerCount: 0,
  singleMode: false,
};

export default withStyles(styles)(Component);
