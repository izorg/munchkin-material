import { ListItemIcon } from "@material-ui/core";
import { ShareVariant } from "mdi-material-ui";
import { defineMessages, useIntl } from "react-intl";

import { useGoBack } from "../../../../utils/location";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const displayName = "ShareItem";

const messages = defineMessages({
  share: {
    defaultMessage: "Share",
    id: "menu.share",
  },

  text: {
    defaultMessage: "Simple but powerful Munchkin level counter",
    id: "share.text",
  },
});

const ShareItem = (props) => {
  const intl = useIntl();

  const goBack = useGoBack();

  const {
    cordova,
    location: { host, pathname, protocol },
  } = window;

  const shareLink = cordova
    ? "https://allmunchkins.com"
    : `${protocol}//${host}${pathname}`;

  if (!navigator.share || cordova?.platformId === "windows") {
    return null;
  }

  const onClick = async () => {
    try {
      await navigator.share({
        text: intl.formatMessage(messages.text),
        title: intl.formatMessage(messages.share),
        url: shareLink,
      });
      goBack();
    } catch (error) {
      // cancel share
    }
  };

  return (
    <ListItem button onClick={onClick} {...props}>
      <ListItemIcon>
        <ShareVariant />
      </ListItemIcon>
      <ListItemText primary={intl.formatMessage(messages.share)} />
    </ListItem>
  );
};

ShareItem.displayName = displayName;

export default ShareItem;
