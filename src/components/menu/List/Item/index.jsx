import React from 'react';
import { ListItem, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(
  {
    gutters: {},
  },
  { name: 'MenuListItem' },
);

const MenuListItem = ({ className, ...props }) => {
  const classes = useStyles();

  return <ListItem className={clsx(classes.gutters, className)} {...props} />;
};

MenuListItem.muiName = 'MenuListItem';

export default MenuListItem;
