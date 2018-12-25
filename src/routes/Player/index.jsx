import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader/root';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import AppBar from './AppBar';
import CombatButton from './CombatButton';
import Slider from './Slider';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },

  sliderContent: {
    display: 'flex',
    flex: 1,
  },
});

class Player extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      playerId: props.match.params.id,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { match } = nextProps;

    if (match && match.params.id !== prevState.playerId) {
      return {
        playerId: match.params.id,
      };
    }

    return null;
  }

  render() {
    const { classes } = this.props;
    const { playerId } = this.state;

    return (
      <>
        <div className={classes.root}>
          <AppBar playerId={playerId} />
          <div className={classes.sliderContent}>
            <Slider playerId={playerId} />
          </div>
        </div>
        <CombatButton playerId={playerId} />
      </>
    );
  }
}

Player.propTypes = {
  match: PropTypes.object,
};

Player.defaultProps = {
  match: null,
};

export default compose(
  hot,
  withStyles(styles),
)(Player);
