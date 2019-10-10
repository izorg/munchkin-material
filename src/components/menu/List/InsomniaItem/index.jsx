import { ListItemIcon, makeStyles, Switch } from '@material-ui/core';
import clsx from 'clsx';
import { Lightbulb, LightbulbOutline } from 'mdi-material-ui';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { setKeepAwake } from '../../../../ducks/app';

import { useOptions } from '../../../OptionsContext';

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

const InsomniaItem = ({ className }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const keepAwake = useSelector((state) => state.app.keepAwake);
  const { keepAwakeSupport } = useOptions();

  if (!keepAwakeSupport) {
    return null;
  }

  return (
    <ListItem
      button
      className={clsx(classes.root, className)}
      onClick={() => dispatch(setKeepAwake(!keepAwake))}
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

export default InsomniaItem;
