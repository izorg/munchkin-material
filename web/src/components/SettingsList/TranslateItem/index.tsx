import { mdiTranslate } from "@mdi/js";
import { ListItem, ListItemIcon, SvgIcon } from "@mui/material";
import { FormattedMessage } from "react-intl";

import ListItemText from "../ItemText";
import { SettingsListItemButton } from "../SettingsListItemButton";

const TranslateItem = () => (
  <ListItem disablePadding>
    <SettingsListItemButton
      component="a"
      href="https://poeditor.com/join/project/ZMBvWu9xIw"
      rel="noopener noreferrer"
      target="_blank"
    >
      <ListItemIcon>
        <SvgIcon>
          <path d={mdiTranslate} />
        </SvgIcon>
      </ListItemIcon>
      <ListItemText
        primary={
          <FormattedMessage defaultMessage="Translate" id="menu.translate" />
        }
      />
    </SettingsListItemButton>
  </ListItem>
);

export default TranslateItem;
