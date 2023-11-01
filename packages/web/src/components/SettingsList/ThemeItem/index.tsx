import { mdiPaletteOutline } from "@mdi/js";
import { ListItem, ListItemIcon, SvgIcon, useTheme } from "@mui/material";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";

import usePresentSelector from "../../../hooks/usePresentSelector";
import themeMessages from "../../../messages/theme";
import themes from "../../../theme/colors";
import ListItemText from "../ItemText";
import { SettingsListItemButton } from "../SettingsListItemButton";

const ThemeItem = () => {
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const themeKey = usePresentSelector((state) => state.theme.id);

  const onClick = () => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.delete("menu");
    searchParams.set("theme", "");

    const to = {
      search: `?${searchParams.toString()}`,
    };

    navigate(to);
  };

  return (
    <ListItem disablePadding>
      <SettingsListItemButton
        onClick={onClick}
        sx={{
          paddingBottom: 0,
          paddingTop: 0,
        }}
      >
        <ListItemIcon>
          <SvgIcon style={{ color: theme.palette.primary.main }}>
            <path d={mdiPaletteOutline} />
          </SvgIcon>
        </ListItemIcon>
        <ListItemText
          primary={intl.formatMessage(themeMessages.label)}
          secondary={themes[themeKey].name(intl)}
        />
      </SettingsListItemButton>
    </ListItem>
  );
};

export default ThemeItem;
