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
import cns from 'classnames';

import {
  MAX_EPIC_LEVEL,
  MAX_LEVEL,
  MIN_LEVEL,
} from '../../../utils/levelLimit';

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
          id="menu.epicLevelLimit"
          defaultMessage="Epic Munchkin ({minLevel} - {maxLevel})"
          values={{
            minLevel: MIN_LEVEL,
            maxLevel: MAX_EPIC_LEVEL,
          }}
        />
      );
    } else {
      secondary = (
        <FormattedMessage
          id="menu.levelLimit"
          defaultMessage="Munchkin ({minLevel} - {maxLevel})"
          values={{
            minLevel: MIN_LEVEL,
            maxLevel: MAX_LEVEL,
          }}
        />
      );
    }
  } else {
    secondary = (
      <FormattedMessage id="menu.noLevelLimit" defaultMessage="No limit" />
    );
  }

  return (
    <ListItem button className={cns(className, classes.root)} {...rest}>
      <ListItemIcon>
        <SwapVert />
      </ListItemIcon>
      <ListItemText
        primary={
          <FormattedMessage id="menu.level" defaultMessage="Level limit" />
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
