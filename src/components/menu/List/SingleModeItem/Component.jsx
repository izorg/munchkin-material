import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ListItemIcon, makeStyles, Switch } from '@material-ui/core';
import { Account, AccountMultiple } from 'mdi-material-ui';
import clsx from 'clsx';

import ListItem from '../Item';
import ListItemText from '../ItemText';

const useStyles = makeStyles(
  {
    root: {
      paddingBottom: 9,
      paddingTop: 9,
    },
  },
  { name: 'SingleModeItem' },
);

const SingleModeItem = ({ className, onChange, singleMode }) => {
  const classes = useStyles();

  return (
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
      <Switch
        checked={singleMode}
        color="primary"
        disableRipple
        edge="end"
        tabIndex={-1}
      />
    </ListItem>
  );
};

SingleModeItem.propTypes = {
  onChange: PropTypes.func.isRequired,
  singleMode: PropTypes.bool,
};

SingleModeItem.defaultProps = {
  singleMode: false,
};

export default SingleModeItem;
