import { mdiStarOutline } from "@mdi/js";
import { ListItem, ListItemIcon, SvgIcon } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { useAppStoreLink } from "../../../utils/appStoreLinkContext";
import ListItemText from "../ItemText";
import { SettingsListItemButton } from "../SettingsListItemButton";

const RateItem = () => {
  const { getAppStoreLink } = useAppStoreLink();

  const appStoreLink = getAppStoreLink();

  if (!appStoreLink) {
    return null;
  }

  return (
    <ListItem disablePadding>
      <SettingsListItemButton component="a" href={appStoreLink} target="_blank">
        <ListItemIcon>
          <SvgIcon>
            <path d={mdiStarOutline} />
          </SvgIcon>
        </ListItemIcon>
        <ListItemText
          primary={
            <FormattedMessage defaultMessage="Rate the app" id="menu.rateApp" />
          }
        />
      </SettingsListItemButton>
    </ListItem>
  );
};

export default RateItem;
