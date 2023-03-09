import { mdiShieldAccountOutline } from "@mdi/js";
import { ListItemIcon, SvgIcon } from "@mui/material";
import { FormattedMessage } from "react-intl";

import ListItem from "../Item";
import ListItemText from "../ItemText";

const PrivacyItem = () => (
  <ListItem
    button
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
        <FormattedMessage
          defaultMessage="Privacy Policy"
          id="menu.privacyPolicy"
        />
      }
    />
  </ListItem>
);

export default PrivacyItem;
