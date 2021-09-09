import { css } from "@emotion/react";
import { mdiPalette } from "@mdi/js";
import { ListItemIcon, SvgIcon, useTheme } from "@mui/material";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";

import themes from "../../../../theme/colors";
import { parseSearch, stringifyQuery } from "../../../../utils/location";
import usePresentSelector from "../../../../utils/usePresentSelector";
import themeMessages from "../../../theme/messages";
import useMenuOpen from "../../useMenuOpen";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const ThemeItem = (): JSX.Element => {
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const themeKey = usePresentSelector((state) => state.theme.id);

  const open = useMenuOpen();

  const onClick = () => {
    const to = {
      ...location,
      search: stringifyQuery({
        ...parseSearch(location.search),
        menu: undefined,
        theme: null,
      }),
    };

    if (open) {
      navigate(to, { replace: true });
    } else {
      navigate(to);
    }
  };

  return (
    <ListItem
      button
      css={css`
        padding-bottom: 0;
        padding-top: 0;
      `}
      onClick={onClick}
    >
      <ListItemIcon>
        <SvgIcon style={{ color: theme.palette.primary.main }}>
          <path d={mdiPalette} />
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
