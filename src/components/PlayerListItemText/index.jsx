import { ListItemText, makeStyles } from '@material-ui/core';
import { ChevronUp as LevelIcon, Sword as StrengthIcon } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

import { playerShape } from '../../utils/propTypes';
import Sex from '../Sex';

const displayName = 'PlayerListItemText';

const useStyles = makeStyles(
  (theme) => ({
    primary: {
      alignItems: 'center',
      display: 'flex',
    },

    name: {
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },

    level: {
      alignItems: 'center',
      display: 'inline-flex',
      justifyContent: 'flex-end',
      marginLeft: theme.spacing(1),
      width: 44,
    },

    strength: {
      alignItems: 'center',
      display: 'inline-flex',
      justifyContent: 'flex-end',
      marginLeft: 4,
      width: 48,
    },

    strengthIcon: {
      fontSize: '1.2em',
      marginLeft: 4,
    },

    sex: {
      fontSize: '1em',
    },
  }),
  { name: displayName },
);

const PlayerListItemText = forwardRef(({ hideStats, player }, ref) => {
  const classes = useStyles();

  return (
    <ListItemText
      ref={ref}
      primary={
        <span className={classes.primary}>
          <span className={classes.name}>{player.name}</span>

          {!hideStats && (
            <>
              <span className={classes.level}>
                {player.level}
                <LevelIcon />
              </span>

              <span className={classes.strength}>
                {player.level + player.gear}
                <StrengthIcon className={classes.strengthIcon} />
              </span>
            </>
          )}
        </span>
      }
      secondary={
        <>
          <Sex className={classes.sex} sex={player.sex} />
        </>
      }
    />
  );
});

PlayerListItemText.propTypes = {
  hideStats: PropTypes.bool,
  player: playerShape.isRequired,
};

PlayerListItemText.defaultProps = {
  hideStats: false,
};

PlayerListItemText.displayName = displayName;

export default PlayerListItemText;
