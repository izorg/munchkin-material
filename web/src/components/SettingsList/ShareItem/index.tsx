import { mdiShareVariantOutline } from "@mdi/js";
import { ListItem, ListItemIcon, SvgIcon } from "@mui/material";
import { useIntl } from "react-intl";

import ListItemText from "../ItemText";
import { SettingsListItemButton } from "../SettingsListItemButton";

const ShareItem = () => {
  const intl = useIntl();

  const shareLink =
    location.protocol === "https:" && location.hostname !== "localhost"
      ? location.origin
      : "https://allmunchkins.com";

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
    } catch {
      return;
    }
  };

  return (
    <ListItem disablePadding>
      <SettingsListItemButton onClick={onClick}>
        <ListItemIcon>
          <SvgIcon>
            <path d={mdiShareVariantOutline} />
          </SvgIcon>
        </ListItemIcon>
        <ListItemText primary={shareText} />
      </SettingsListItemButton>
    </ListItem>
  );
};

export default ShareItem;
