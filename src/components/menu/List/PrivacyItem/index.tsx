import { ListItemIcon } from "@material-ui/core";
import { ShieldAccount } from "mdi-material-ui";
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
        <ShieldAccount />
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
