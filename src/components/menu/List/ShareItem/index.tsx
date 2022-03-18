import { mdiShareVariantOutline } from "@mdi/js";
import { ListItemIcon, SvgIcon } from "@mui/material";
import { defineMessages, useIntl } from "react-intl";

import ListItem from "../Item";
import ListItemText from "../ItemText";

const messages = defineMessages({
  share: {
    defaultMessage: "Share",
    id: "menu.share",
  },

  text: {
    defaultMessage: "Simple but powerful Level Counter for Munchkin",
    id: "share.text",
  },
});

const ShareItem = () => {
  const intl = useIntl();

  const {
    cordova,
    location: { origin },
  } = window;

  const shareLink = cordova ? "https://allmunchkins.com" : origin;

  if (!navigator.share) {
    return null;
  }

  const onClick = async () => {
    try {
      await navigator.share({
        text: intl.formatMessage(messages.text),
        title: intl.formatMessage(messages.share),
        url: shareLink,
      });
    } catch (error) {
      return;
    }
  };

  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        <SvgIcon>
          <path d={mdiShareVariantOutline} />
        </SvgIcon>
      </ListItemIcon>
      <ListItemText primary={intl.formatMessage(messages.share)} />
    </ListItem>
  );
};

export default ShareItem;
