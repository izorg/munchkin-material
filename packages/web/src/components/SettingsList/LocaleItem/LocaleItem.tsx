import { mdiTranslate } from "@mdi/js";
import { ListItem, ListItemIcon, SvgIcon } from "@mui/material";
import { use } from "react";
import { FormattedMessage } from "react-intl";

import { LocaleContext } from "../../../domains/i18n";
import ListItemText from "../ItemText";
import { SettingsListItemButton } from "../SettingsListItemButton";

export const LocaleItem = () => {
  const openLocaleSettings = use(LocaleContext)?.openLocaleSettings;

  if (!openLocaleSettings) {
    return null;
  }

  return (
    <ListItem disablePadding>
      <SettingsListItemButton onClick={openLocaleSettings}>
        <ListItemIcon>
          <SvgIcon>
            <path d={mdiTranslate} />
          </SvgIcon>
        </ListItemIcon>
        <ListItemText
          primary={<FormattedMessage defaultMessage="Language" id="y1Z3or" />}
        />
      </SettingsListItemButton>
    </ListItem>
  );
};
