import React, { createRef, Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import cns from 'classnames';

import Nobody from '../../../../components/Nobody';

import AppBar from './AppBar';
import LevelLimitDialog from './LevelLimitDialog';
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

  single: {
    backgroundColor: theme.palette.background.paper,
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

class HomePage extends PureComponent {
  constructor(props) {
    super(props);

    this.contentRef = createRef();
  }

  componentDidUpdate(prevProps) {
    const { playerCount } = this.props;
    const node = this.contentRef.current;

    if (playerCount > prevProps.playerCount) {
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
          <Paper className={classes.listContainer} square>
            <PlayerList />
          </Paper>
        </div>
      );
    }

    return (
      <Fragment>
        <div className={cns(classes.root, { [classes.single]: singleMode })}>
          <AppBar />
          {content}
        </div>
        {menu && <MenuDrawer />}
        <LevelLimitDialog />
        <ThemeDialog />
      </Fragment>
    );
  }
}

HomePage.propTypes = {
  empty: PropTypes.bool,
  menu: PropTypes.bool,
  playerCount: PropTypes.number,
  singleMode: PropTypes.bool,
};

HomePage.defaultProps = {
  empty: false,
  menu: false,
  playerCount: 0,
  singleMode: false,
};

export default withStyles(styles)(HomePage);
