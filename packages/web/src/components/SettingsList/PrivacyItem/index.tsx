import { mdiShieldAccountOutline } from "@mdi/js";
import { ListItem, ListItemIcon, SvgIcon } from "@mui/material";
import { FormattedMessage } from "react-intl";

import ListItemText from "../ItemText";
import { SettingsListItemButton } from "../SettingsListItemButton";

const PrivacyItem = () => (
  <ListItem disablePadding>
    <SettingsListItemButton
      component="a"
      href="https://allmunchkins.com/privacy"
      rel="noopener noreferrer"
      target="_blank"
    >
      <ListItemIcon>
        <SvgIcon>
          <path d={mdiShieldAccountOutline} />
        </SvgIcon>
      </ListItemIcon>
      <ListItemText
        primary={
          // eslint-disable-next-line formatjs/enforce-id -- will migrate to autogenerated ids
          <FormattedMessage
            defaultMessage="Privacy Policy"
            id="menu.privacyPolicy"
          />
        }
      />
    </SettingsListItemButton>
  </ListItem>
);

export default PrivacyItem;
