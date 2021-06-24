import { ListItemIcon } from "@material-ui/core";
import { ShareVariant } from "mdi-material-ui";
import { defineMessages, useIntl } from "react-intl";

import { useGoBack } from "../../../../utils/location";
import useMenuOpen from "../../useMenuOpen";
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

const ShareItem = (): JSX.Element | null => {
  const intl = useIntl();

  const goBack = useGoBack();
  const open = useMenuOpen();

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

    if (open) {
      goBack();
    }
  };

  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        <ShareVariant />
      </ListItemIcon>
      <ListItemText primary={intl.formatMessage(messages.share)} />
    </ListItem>
  );
};

export default ShareItem;
