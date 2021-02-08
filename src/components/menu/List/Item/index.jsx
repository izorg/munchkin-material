import { ListItem, makeStyles } from "@material-ui/core";

const displayName = "MenuListItem";

const useStyles = makeStyles(
  {
    gutters: {},
  },
  { name: displayName }
);

const MenuListItem = (props) => {
  const classes = useStyles();

  return <ListItem classes={classes} {...props} />;
};

MenuListItem.displayName = displayName;

MenuListItem.muiName = displayName;

export default MenuListItem;
