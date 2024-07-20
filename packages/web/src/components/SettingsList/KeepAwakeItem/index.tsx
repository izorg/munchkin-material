import { mdiLightbulb, mdiLightbulbOutline } from "@mdi/js";
import { ListItem, ListItemIcon, SvgIcon, Switch } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { useWakeLock } from "../../../utils/wakeLockContext";
import ListItemText from "../ItemText";
import { SettingsListItemButton } from "../SettingsListItemButton";

const KeepAwakeItem = () => {
  const { setWakeLock, wakeLock, wakeLockSupport } = useWakeLock();

  if (!wakeLockSupport) {
    return null;
  }

  return (
    <ListItem disablePadding>
      <SettingsListItemButton
        onClick={() => {
          void setWakeLock(!wakeLock);
        }}
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
            // eslint-disable-next-line formatjs/enforce-id
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
      </SettingsListItemButton>
    </ListItem>
  );
};

export default KeepAwakeItem;
