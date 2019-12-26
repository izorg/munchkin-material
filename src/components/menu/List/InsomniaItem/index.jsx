import { ListItemIcon, makeStyles, Switch } from '@material-ui/core';
import clsx from 'clsx';
import { Lightbulb, LightbulbOutline } from 'mdi-material-ui';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { setKeepAwake } from '../../../../ducks/app';

import { useConfig } from '../../../ConfigProvider';

import ListItem from '../Item';
import ListItemText from '../ItemText';

const displayName = 'InsomniaItem';

const useStyles = makeStyles(
  {
    root: {
      paddingBottom: 9,
      paddingTop: 9,
    },
  },
  { name: displayName },
);

const InsomniaItem = ({ className }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const keepAwake = useSelector((state) => state.app.keepAwake);
  const { keepAwakeSupport } = useConfig();

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

InsomniaItem.displayName = displayName;

export default InsomniaItem;
