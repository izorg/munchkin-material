import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ListItemIcon, makeStyles, Switch } from '@material-ui/core';
import { Lightbulb, LightbulbOutline } from 'mdi-material-ui';
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
  { name: 'InsomniaItem' },
);

const InsomniaItem = ({ className, keepAwake, onChange }) => {
  const classes = useStyles();

  return (
    <ListItem
      button
      className={clsx(classes.root, className)}
      onClick={() => onChange(!keepAwake)}
    >
      <ListItemIcon>
        {keepAwake ? <Lightbulb /> : <LightbulbOutline />}
      </ListItemIcon>
      <ListItemText
        primary={
          <FormattedMessage defaultMessage="Keep awake" id="menu.keepAwake" />
        }
      />
      <Switch
        checked={keepAwake}
        color="primary"
        disableRipple
        edge="end"
        tabIndex={-1}
      />
    </ListItem>
  );
};

InsomniaItem.propTypes = {
  keepAwake: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

InsomniaItem.defaultProps = {
  keepAwake: false,
};

export default InsomniaItem;
