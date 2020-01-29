import { ListItemText, makeStyles } from '@material-ui/core';
import { ChevronUp as LevelIcon, Sword as StrengthIcon } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import React from 'react';

import { playerShape } from '../../utils/propTypes';
import Sex from '../Sex';

const displayName = 'PlayerListItemText';

const useStyles = makeStyles(
  {
    main: {
      display: 'flex',
      flexDirection: 'column',
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
      width: 50,
    },

    strength: {
      alignItems: 'center',
      display: 'inline-flex',
      justifyContent: 'flex-end',
      width: 60,
    },

    strengthIcon: {
      fontSize: '1.2em',
      marginLeft: 4,
    },

    sex: {
      fontSize: '1em',
    },

    stats: {
      flexGrow: 0,
      flexShrink: 0,
    },
  },
  { name: displayName },
);

const PlayerListItemText = ({ hideStats, player }) => {
  const classes = useStyles();

  return (
    <>
      <ListItemText
        className={classes.main}
        primary={player.name}
        primaryTypographyProps={{ className: classes.name }}
        secondary={<Sex className={classes.sex} sex={player.sex} />}
      />
      {!hideStats && (
        <ListItemText
          className={classes.stats}
          primaryTypographyProps={{
            variant: 'h6',
          }}
        >
          <span className={classes.level}>
            {player.level}
            <LevelIcon />
          </span>

          <span className={classes.strength}>
            {player.level + player.gear}
            <StrengthIcon className={classes.strengthIcon} />
          </span>
        </ListItemText>
      )}
    </>
  );
};

PlayerListItemText.propTypes = {
  hideStats: PropTypes.bool,
  player: playerShape.isRequired,
};

PlayerListItemText.defaultProps = {
  hideStats: false,
};

PlayerListItemText.displayName = displayName;

export default PlayerListItemText;
