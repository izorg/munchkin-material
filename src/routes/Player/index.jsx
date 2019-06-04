import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader/root';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';

import PlayerContext from '../../components/PlayerContext';
import { matchShape } from '../../utils/propTypes';

import AppBar from './AppBar';
import CombatButton from './CombatButton';
import Slider from './Slider';
import Undo from './Undo';

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

  static getDerivedStateFromProps(nextProps) {
    const { match } = nextProps;

    if (match) {
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
      <PlayerContext.Provider value={playerId}>
        <div className={classes.root}>
          <AppBar playerId={playerId} />
          <div className={classes.sliderContent}>
            <Slider playerId={playerId} />
          </div>
        </div>
        <CombatButton playerId={playerId} />
        <Undo />
      </PlayerContext.Provider>
    );
  }
}

Player.propTypes = {
  match: matchShape,
};

Player.defaultProps = {
  match: null,
};

Player.displayName = 'Player';

export default compose(
  hot,
  withStyles(styles),
)(Player);
