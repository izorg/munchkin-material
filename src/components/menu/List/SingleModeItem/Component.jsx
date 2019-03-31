import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  withStyles,
} from '@material-ui/core';
import { Person } from '@material-ui/icons';
import clsx from 'clsx';

const styles = {
  root: {
    paddingBottom: 0,
    paddingTop: 0,
  },
};

const SingleModeItem = ({ classes, className, onChange, singleMode }) => (
  <ListItem
    button
    className={clsx(classes.root, className)}
    data-screenshots="single-mode-item"
    onClick={() => onChange(!singleMode)}
  >
    <ListItemIcon>
      <Person />
    </ListItemIcon>
    <ListItemText
      primary={
        <FormattedMessage defaultMessage="Single mode" id="menu.singleMode" />
      }
    />
    <Switch checked={singleMode} color="primary" disableRipple tabIndex={-1} />
  </ListItem>
);

SingleModeItem.propTypes = {
  onChange: PropTypes.func.isRequired,
  singleMode: PropTypes.bool,
};

SingleModeItem.defaultProps = {
  singleMode: false,
};

export default withStyles(styles)(SingleModeItem);
