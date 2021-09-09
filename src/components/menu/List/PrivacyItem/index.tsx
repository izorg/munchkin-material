import { mdiShieldAccount } from "@mdi/js";
import { ListItemIcon, SvgIcon } from "@mui/material";
import { FormattedMessage } from "react-intl";

import ListItem from "../Item";
import ListItemText from "../ItemText";

const PrivacyItem = (): JSX.Element | null => {
  if (!("cordova" in window)) {
    return null;
  }

  return (
    <ListItem
      button
      component="a"
      href="https://allmunchkins.com/privacy"
      rel="noopener noreferrer"
      target="_blank"
    >
      <ListItemIcon>
        <SvgIcon>
          <path d={mdiShieldAccount} />
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
};

export default PrivacyItem;
