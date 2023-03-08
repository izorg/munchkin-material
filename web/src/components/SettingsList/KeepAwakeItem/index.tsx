import { mdiLightbulb, mdiLightbulbOutline } from "@mdi/js";
import { ListItemIcon, SvgIcon, Switch } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { useWakeLock } from "../../../utils/wakeLockContext";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const KeepAwakeItem = () => {
  const { setWakeLock, wakeLock, wakeLockSupport } = useWakeLock();

  if (!wakeLockSupport) {
    return null;
  }

  return (
    <ListItem
      button
      onClick={() => setWakeLock(!wakeLock)}
      sx={{
        paddingBottom: "9px",
        paddingTop: "9px",
      }}
    >
      <ListItemIcon>
        <SvgIcon>
          <path d={wakeLock ? mdiLightbulb : mdiLightbulbOutline} />
        </SvgIcon>
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

export default KeepAwakeItem;
