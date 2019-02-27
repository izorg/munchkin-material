import React, { PureComponent } from 'react';
import MediaQuery from 'react-responsive';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import { IconButton, Paper, withStyles } from '@material-ui/core';
import { CloseCircle } from 'mdi-material-ui';
import clsx from 'clsx';
import { compact, noop } from 'lodash/fp';

import Player from './Player';

const styles = (theme) => ({
  players: {
    alignItems: 'flex-start',
    display: 'flex',
    position: 'relative',
  },

  remove: {
    bottom: 8,
    height: 36,
    padding: 6,
    position: 'absolute',
    right: 8,
    width: 36,
  },

  [`${theme.breakpoints.up('sm')} and (orientation: portrait)`]: {
    paper: {
      marginTop: 8,
    },
  },

  '@media (orientation: landscape)': {
    players: {
      alignItems: 'center',
      overflow: 'hidden',
    },

    remove: {
      bottom: 8,
      right: 8,
    },
  },
});

class CombatPlayerSlider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      helperId: props.helperId,
      index: 0,
    };

    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleHelperRemove = this.handleHelperRemove.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { helperId } = nextProps;
    const { index } = prevState;

    let nextState = null;

    if (helperId !== prevState.helperId) {
      nextState = {
        ...nextState,
        helperId,
      };

      if (!prevState.helperId && helperId && index === 0) {
        nextState = {
          ...nextState,
          index: 1,
        };
      }
    }

    return nextState;
  }

  handleChangeIndex(index) {
    this.setState({
      index,
    });
  }

  handleHelperRemove() {
    const { onHelperRemove } = this.props;

    this.setState({
      index: 0,
    });

    onHelperRemove();
  }

  render() {
    const {
      classes,
      className,
      helperId,
      onHelperBonusChange,
      onPlayerBonusChange,
      playerId,
    } = this.props;

    const { index } = this.state;

    const players = compact([
      <Paper key={playerId} className={classes.paper}>
        <Player id={playerId} onBonusChange={onPlayerBonusChange} />
      </Paper>,
      helperId && (
        <Paper key={helperId} className={classes.paper}>
          <Player id={helperId} onBonusChange={onHelperBonusChange} />

          <IconButton
            className={classes.remove}
            onClick={this.handleHelperRemove}
          >
            <CloseCircle />
          </IconButton>
        </Paper>
      ),
    ]);

    return (
      <div className={clsx(classes.players, className)}>
        <MediaQuery orientation="portrait">
          <SwipeableViews
            enableMouseEvents
            index={index}
            onChangeIndex={this.handleChangeIndex}
            slideStyle={{
              padding: '0 8px 8px',
              position: 'relative',
            }}
            style={{
              flex: 1,
              padding: '0 32px',
            }}
          >
            {players}
          </SwipeableViews>
        </MediaQuery>

        <MediaQuery orientation="landscape">
          <SwipeableViews
            axis="y"
            containerStyle={{
              height: 215,
              width: '100%',
            }}
            enableMouseEvents
            ignoreNativeScroll
            index={index}
            onChangeIndex={this.handleChangeIndex}
            slideStyle={{
              height: 215,
              padding: '8px 8px 8px 24px',
              position: 'relative',
            }}
            style={{
              alignItems: 'center',
              display: 'flex',
              overflowY: 'visible',
              width: '100%',
            }}
          >
            {players}
          </SwipeableViews>
        </MediaQuery>
      </div>
    );
  }
}

CombatPlayerSlider.propTypes = {
  helperId: PropTypes.string,
  onHelperBonusChange: PropTypes.func,
  onHelperRemove: PropTypes.func,
  onPlayerBonusChange: PropTypes.func,
  playerId: PropTypes.string.isRequired,
};

CombatPlayerSlider.defaultProps = {
  helperId: null,
  onHelperBonusChange: noop,
  onHelperRemove: noop,
  onPlayerBonusChange: noop,
};

export default withStyles(styles)(CombatPlayerSlider);
