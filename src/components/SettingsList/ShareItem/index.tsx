import { mdiShareVariantOutline } from "@mdi/js";
import { ListItemIcon, SvgIcon } from "@mui/material";
import { useIntl } from "react-intl";

import ListItem from "../Item";
import ListItemText from "../ItemText";

const ShareItem = () => {
  const intl = useIntl();

  const cordova = window.cordova;

  const shareLink = cordova
    ? "https://allmunchkins.com"
    : window.location.origin;

  if (!navigator.share) {
    return null;
  }

  const shareText = intl.formatMessage({
    defaultMessage: "Share",
    id: "menu.share",
  });

  const onClick = async () => {
    try {
      await navigator.share({
        text: intl.formatMessage({
          defaultMessage: "Simple but powerful Level Counter for Munchkin",
          id: "share.text",
        }),
        title: shareText,
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
      <ListItemText primary={shareText} />
    </ListItem>
  );
};

export default ShareItem;
