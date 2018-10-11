import React, { createRef, Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
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
    backgroundColor: theme.palette.background.paper,
    flex: 1,
    overflowY: 'auto',
    paddingBottom: 48,

    [theme.breakpoints.up('sm')]: {
      backgroundColor: 'transparent',
      paddingBottom: 0,
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
          <PlayerList className={classes.list} />
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
