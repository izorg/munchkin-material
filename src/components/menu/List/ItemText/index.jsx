import { ListItemText, makeStyles } from "@material-ui/core";
import clsx from "clsx";

const displayName = "MenuListItemText";

const useStyles = makeStyles(
  {
    text: {
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  { name: displayName }
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

MenuListItemText.displayName = displayName;

MenuListItemText.muiName = displayName;

export default MenuListItemText;
