import { mdiPaletteOutline } from "@mdi/js";
import { ListItemIcon, SvgIcon, useTheme } from "@mui/material";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";

import themes from "../../../theme/colors";
import usePresentSelector from "../../../utils/usePresentSelector";
import themeMessages from "../../theme/messages";
import ListItem from "../Item";
import ListItemText from "../ItemText";

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
    <ListItem
      button
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
    </ListItem>
  );
};

export default ThemeItem;
