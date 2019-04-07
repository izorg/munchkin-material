import React from 'react';
import { ListItemText, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(
  {
    text: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  { name: 'MenuListItemText' },
);

const MenuListItemText = ({ className, ...props }) => {
  const classes = useStyles();

  return (
    <ListItemText
      className={clsx(classes.text, className)}
      primaryTypographyProps={{ noWrap: true }}
      secondaryTypographyProps={{ noWrap: true }}
      {...props}
    />
  );
};

MenuListItemText.muiName = 'MenuListItemText';

export default MenuListItemText;
