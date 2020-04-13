import { ListItemIcon, makeStyles, Switch } from '@material-ui/core';
import clsx from 'clsx';
import { getLocation, goBack } from 'connected-react-router';
import { Account, AccountMultiple } from 'mdi-material-ui';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { setSingleMode } from '../../../../ducks/app';
import { useFullVersion } from '../../../FullVersionProvider';
import openSelector from '../../openSelector';
import ListItem from '../Item';
import ListItemText from '../ItemText';

const displayName = 'SingleModeItem';

const useStyles = makeStyles(
  {
    root: {
      paddingBottom: 9,
      paddingTop: 9,
    },
  },
  { name: displayName },
);

const SingleModeItem = ({ className }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const singleMode = useSelector((state) => state.app.singleMode);
  const open = useSelector(openSelector);
  const { pathname } = useSelector(getLocation);

  const { buyFullVersion, fullVersion } = useFullVersion();

  const onChange = async (isSingleMode) => {
    const needBack = open || pathname !== '/';

    if (isSingleMode && !fullVersion) {
      try {
        await buyFullVersion();
      } catch (error) {
        return;
      }
    }

    dispatch(setSingleMode(isSingleMode));

    if (needBack) {
      dispatch(goBack());
    }
  };

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

SingleModeItem.displayName = displayName;

export default SingleModeItem;
