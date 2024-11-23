import { mdiPaletteOutline } from "@mdi/js";
import {
  Badge,
  ListItem,
  ListItemIcon,
  SvgIcon,
  useTheme,
} from "@mui/material";
import { useCallback } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router";

import usePresentSelector from "../../../hooks/usePresentSelector";
import themeMessages from "../../../messages/theme";
import themes from "../../../theme/colors";
import { useFullVersion } from "../../../utils/fullVersionContext";
import ListItemText from "../ItemText";
import { SettingsListItemButton } from "../SettingsListItemButton";

const ThemeItem = () => {
  const intl = useIntl();
  const [, setSearchParams] = useSearchParams();
  const theme = useTheme();

  const { fullVersion } = useFullVersion();

  const themeKey = usePresentSelector((state) => state.theme.id);

  const onClick = useCallback(() => {
    setSearchParams((searchParams) => {
      searchParams.set("theme", "");

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
          <Badge badgeContent="$" invisible={fullVersion}>
            <SvgIcon style={{ color: theme.palette.primary.main }}>
              <path d={mdiPaletteOutline} />
            </SvgIcon>
          </Badge>
        </ListItemIcon>
        <ListItemText
          primary={intl.formatMessage(themeMessages.color)}
          secondary={themes[themeKey].name(intl)}
        />
      </SettingsListItemButton>
    </ListItem>
  );
};

export default ThemeItem;
