import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import { SwapVert } from '@material-ui/icons';
import clsx from 'clsx';

import {
  MAX_EPIC_LEVEL,
  MAX_LEVEL,
  MIN_LEVEL,
} from '../../../../utils/levelLimit';

const styles = {
  root: {
    paddingBottom: 2,
    paddingTop: 2,
  },
};

const LevelLimitItem = ({ classes, className, epic, levelLimit, ...rest }) => {
  let secondary;

  if (levelLimit) {
    if (epic) {
      secondary = (
        <FormattedMessage
          defaultMessage="Epic Munchkin ({minLevel} - {maxLevel})"
          id="menu.epicLevelLimit"
          values={{
            minLevel: MIN_LEVEL,
            maxLevel: MAX_EPIC_LEVEL,
          }}
        />
      );
    } else {
      secondary = (
        <FormattedMessage
          defaultMessage="Munchkin ({minLevel} - {maxLevel})"
          id="menu.levelLimit"
          values={{
            minLevel: MIN_LEVEL,
            maxLevel: MAX_LEVEL,
          }}
        />
      );
    }
  } else {
    secondary = (
      <FormattedMessage defaultMessage="No limit" id="menu.noLevelLimit" />
    );
  }

  return (
    <ListItem button className={clsx(className, classes.root)} {...rest}>
      <ListItemIcon>
        <SwapVert />
      </ListItemIcon>
      <ListItemText
        primary={
          <FormattedMessage defaultMessage="Level limit" id="menu.level" />
        }
        secondary={secondary}
      />
    </ListItem>
  );
};

LevelLimitItem.propTypes = {
  epic: PropTypes.bool,
  levelLimit: PropTypes.bool,
};

LevelLimitItem.defaultProps = {
  epic: false,
  levelLimit: false,
};

export default withStyles(styles)(LevelLimitItem);
