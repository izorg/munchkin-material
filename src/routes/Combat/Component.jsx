import React from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';
import { noop } from 'lodash/fp';

import AppBar from './AppBar';
import HelperButton from './HelperButton';
import HelperSelector from './HelperSelector';
import MonsterSlider from './MonsterSlider';
import PlayerSlider from './PlayerSlider';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    zIndex: 1,
  },

  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 0,

    '@supports(padding: env(safe-area-inset-left))': {
      paddingLeft: 'env(safe-area-inset-left)',
      paddingRight: 'env(safe-area-inset-right)',
    },
  },

  players: {
    flex: 1,
  },

  monsters: {
    flex: 1,
  },

  total: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },

  value: {
    color: theme.palette.text.primary,
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: '2em',
  },

  versus: {
    margin: '0 0.5em',
  },

  [`${theme.breakpoints.up('sm')} and (orientation: portrait)`]: {
    content: {
      justifyContent: 'center',
    },

    players: {
      flex: 'none',
    },

    monsters: {
      flex: 'none',
    },

    total: {
      padding: `${theme.spacing(2)}px 0`,
    },
  },

  '@media (orientation: landscape)': {
    content: {
      flexDirection: 'row',
    },

    total: {
      flexDirection: 'column',
      width: 50,
    },
  },
});

const Combat = ({
  classes,
  combinedMonsterStrength,
  combinedPlayerStrength,
  helperId,
  onHelperBonusChange,
  onHelperRemove,
  onMonsterAdd,
  onMonsterRemove,
  onPlayerBonusChange,
  playerId,
}) => (
  <>
    <div className={classes.root}>
      <AppBar />
      <div className={classes.content}>
        <PlayerSlider
          className={classes.players}
          helperId={helperId}
          onHelperBonusChange={onHelperBonusChange}
          onHelperRemove={onHelperRemove}
          onPlayerBonusChange={onPlayerBonusChange}
          playerId={playerId}
        />

        <div className={classes.total}>
          <span className={classes.value}>{combinedPlayerStrength}</span>
          <Typography className={classes.versus} component="span">
            vs
          </Typography>
          <span className={classes.value}>{combinedMonsterStrength}</span>
        </div>

        <MonsterSlider
          className={classes.monsters}
          onMonsterAdd={onMonsterAdd}
          onMonsterRemove={onMonsterRemove}
        />
      </div>
    </div>

    <HelperButton
      TransitionProps={{
        appear: false,
      }}
    />

    <HelperSelector />
  </>
);

Combat.propTypes = {
  combinedMonsterStrength: PropTypes.number.isRequired,
  combinedPlayerStrength: PropTypes.number.isRequired,
  helperId: PropTypes.string,
  onHelperBonusChange: PropTypes.func,
  onHelperRemove: PropTypes.func,
  onMonsterAdd: PropTypes.func,
  onMonsterRemove: PropTypes.func,
  onPlayerBonusChange: PropTypes.func,
  playerId: PropTypes.string.isRequired,
};

Combat.defaultProps = {
  helperId: null,
  onHelperBonusChange: noop,
  onHelperRemove: noop,
  onMonsterAdd: noop,
  onMonsterRemove: noop,
  onPlayerBonusChange: noop,
};

export default withStyles(styles)(Combat);
