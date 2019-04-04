import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  ListItemIcon,
  ListItemText,
  Switch,
  withStyles,
} from '@material-ui/core';
import { Account, AccountMultiple } from 'mdi-material-ui';
import clsx from 'clsx';

import ListItem from '../Item';

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
      {singleMode ? <Account /> : <AccountMultiple />}
    </ListItemIcon>
    <ListItemText
      primary={
        <FormattedMessage defaultMessage="Single mode" id="menu.singleMode" />
      }
      primaryTypographyProps={{ noWrap: true }}
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
