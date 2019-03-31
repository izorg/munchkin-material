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
import { PowerSettingsNew } from '@material-ui/icons';
import clsx from 'clsx';

const styles = {
  root: {
    paddingBottom: 0,
    paddingTop: 0,
  },
};

const InsomniaItem = ({ classes, className, keepAwake, onChange }) => (
  <ListItem
    button
    className={clsx(classes.root, className)}
    onClick={() => onChange(!keepAwake)}
  >
    <ListItemIcon>
      <PowerSettingsNew />
    </ListItemIcon>
    <ListItemText
      primary={
        <FormattedMessage defaultMessage="Keep awake" id="menu.keepAwake" />
      }
    />
    <Switch checked={keepAwake} color="primary" disableRipple tabIndex={-1} />
  </ListItem>
);

InsomniaItem.propTypes = {
  keepAwake: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

InsomniaItem.defaultProps = {
  keepAwake: false,
};

export default withStyles(styles)(InsomniaItem);
