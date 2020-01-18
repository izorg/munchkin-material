import { ListItem, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const displayName = 'MenuListItem';

const useStyles = makeStyles(
  {
    gutters: {},
  },
  { name: displayName },
);

const MenuListItem = ({ className, ...props }) => {
  const classes = useStyles();

  return <ListItem className={clsx(classes.gutters, className)} {...props} />;
};

MenuListItem.displayName = displayName;

MenuListItem.muiName = displayName;

export default MenuListItem;
