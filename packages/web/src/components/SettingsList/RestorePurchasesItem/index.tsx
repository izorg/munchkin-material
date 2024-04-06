import { mdiCloudDownloadOutline } from "@mdi/js";
import { ListItem, ListItemIcon, SvgIcon } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { useFullVersion } from "../../../utils/fullVersionContext";
import ListItemText from "../ItemText";
import { SettingsListItemButton } from "../SettingsListItemButton";

const RestorePurchasesItem = () => {
  const { fullVersion, restorePurchases } = useFullVersion();

  if (fullVersion || !restorePurchases) {
    return null;
  }

  return (
    <ListItem disablePadding>
      <SettingsListItemButton onClick={restorePurchases}>
        <ListItemIcon>
          <SvgIcon>
            <path d={mdiCloudDownloadOutline} />
          </SvgIcon>
        </ListItemIcon>
        <ListItemText
          primary={
            // eslint-disable-next-line formatjs/enforce-id
            <FormattedMessage
              defaultMessage="Restore purchases"
              id="menu.restorePurchases"
            />
          }
        />
      </SettingsListItemButton>
    </ListItem>
  );
};

export default RestorePurchasesItem;
