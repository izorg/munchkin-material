import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Zoom } from '@material-ui/core';
import clsx from 'clsx';

import LevelLimitDialog from '../../components/LevelLimitDialog';
import MenuDrawer from '../../components/MenuDrawer';
import Nobody from '../../components/Nobody';
import ThemeDialog from '../../components/ThemeDialog';

import modeShape from './modeShape';

import AppBar from './AppBar';
import PlayerAddButton from './PlayerAddButton';
import PlayerList from './PlayerList';
import SinglePlayer from './SinglePlayer';
import Undo from './Undo';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },

  single: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.background.default
        : theme.palette.background.paper,
  },

  content: {
    backgroundColor: theme.palette.background.paper,
    flex: 1,
    overflowY: 'auto',
    paddingBottom: 48,
    touchAction: 'pan-y',
    WebkitOverflowScrolling: 'touch',

    [theme.breakpoints.up('sm')]: {
      backgroundColor: 'transparent',
      paddingBottom: 0,
    },

    [theme.palette.type === 'dark' && theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.background.default,
    },
  },

  list: {
    [theme.breakpoints.up('sm')]: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      margin: '0 auto',
      width: 400,
    },
  },
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.contentRef = createRef();
  }

  componentDidUpdate(prevProps) {
    const { playerCount } = this.props;

    // eslint-disable-next-line react/prop-types
    const node = this.contentRef.current;

    if (playerCount > prevProps.playerCount) {
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    const { classes, empty, match, menu, mode, singleMode } = this.props;

    let content;

    if (singleMode) {
      content = <SinglePlayer />;
    } else if (empty) {
      content = <Nobody />;
    } else {
      content = (
        <div ref={this.contentRef} className={classes.content}>
          <PlayerList className={classes.list} mode={mode} />
        </div>
      );
    }

    return (
      <>
        <div className={clsx(classes.root, { [classes.single]: singleMode })}>
          <AppBar mode={mode} singleMode={singleMode} />
          {content}
        </div>

        <Zoom appear={false} in={Boolean(match) && !mode && !singleMode}>
          <PlayerAddButton />
        </Zoom>

        {menu && <MenuDrawer />}
        <LevelLimitDialog />
        <ThemeDialog />

        <Undo />
      </>
    );
  }
}

Home.propTypes = {
  empty: PropTypes.bool,
  match: PropTypes.object,
  menu: PropTypes.bool,
  mode: modeShape,
  playerCount: PropTypes.number,
  singleMode: PropTypes.bool,
};

Home.defaultProps = {
  empty: false,
  match: null,
  menu: false,
  mode: undefined,
  playerCount: 0,
  singleMode: false,
};

export default withStyles(styles)(Home);
