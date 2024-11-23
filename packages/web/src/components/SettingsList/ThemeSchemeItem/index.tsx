import { mdiBrightness4, mdiBrightness7, mdiBrightnessAuto } from "@mdi/js";
import {
  ListItem,
  ListItemIcon,
  type PaletteMode,
  SvgIcon,
} from "@mui/material";
import { useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSearchParams } from "react-router";

import usePresentSelector from "../../../hooks/usePresentSelector";
import themeMessages from "../../../messages/theme";
import ListItemText from "../ItemText";
import { SettingsListItemButton } from "../SettingsListItemButton";

const getIcon = (mode?: PaletteMode) => {
  if (mode === "light") {
    return mdiBrightness7;
  }

  if (mode === "dark") {
    return mdiBrightness4;
  }

  return mdiBrightnessAuto;
};

const getSchemeLabel = (mode?: PaletteMode) => {
  if (mode === "light") {
    return <FormattedMessage {...themeMessages.schemeLight} />;
  }

  if (mode === "dark") {
    return <FormattedMessage {...themeMessages.schemeDark} />;
  }

  return <FormattedMessage {...themeMessages.schemeAuto} />;
};

const ThemeSchemeItem = () => {
  const intl = useIntl();
  const [, setSearchParams] = useSearchParams();

  const mode = usePresentSelector((state) => state.theme.mode);

  const onClick = useCallback(() => {
    setSearchParams((searchParams) => {
      searchParams.set("scheme", "");

      return searchParams;
    });
  }, [setSearchParams]);

  return (
    <ListItem disablePadding>
      <SettingsListItemButton
        onClick={onClick}
        sx={{
          paddingY: 0,
        }}
      >
        <ListItemIcon>
          <SvgIcon>
            <path d={getIcon(mode)} />
          </SvgIcon>
        </ListItemIcon>
        <ListItemText
          primary={intl.formatMessage(themeMessages.label)}
          secondary={getSchemeLabel(mode)}
        />
      </SettingsListItemButton>
    </ListItem>
  );
};

export default ThemeSchemeItem;
