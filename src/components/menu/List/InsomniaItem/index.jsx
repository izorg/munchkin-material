import { ListItemIcon, makeStyles, Switch } from "@material-ui/core";
import { Lightbulb, LightbulbOutline } from "mdi-material-ui";
import { FormattedMessage } from "react-intl";

import { useWakeLock } from "../../../WakeLockProvider";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const displayName = "InsomniaItem";

const useStyles = makeStyles(
  {
    root: {
      paddingBottom: 9,
      paddingTop: 9,
    },
  },
  { name: displayName }
);

const InsomniaItem = () => {
  const classes = useStyles();

  const { setWakeLock, wakeLock, wakeLockSupport } = useWakeLock();

  if (!wakeLockSupport) {
    return null;
  }

  return (
    <ListItem
      button
      className={classes.root}
      onClick={() => setWakeLock(!wakeLock)}
    >
      <ListItemIcon>
        {wakeLock ? <Lightbulb /> : <LightbulbOutline />}
      </ListItemIcon>
      <ListItemText
        primary={
          <FormattedMessage defaultMessage="Keep awake" id="menu.keepAwake" />
        }
      />
      <Switch
        checked={wakeLock}
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
