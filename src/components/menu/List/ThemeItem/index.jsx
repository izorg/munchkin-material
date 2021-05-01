import { css } from "@emotion/react";
import { ListItemIcon, useTheme } from "@material-ui/core";
import { Palette } from "mdi-material-ui";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import themes from "../../../../theme/colors";
import { parseSearch, stringifyQuery } from "../../../../utils/location";
import themeMessages from "../../../theme/messages";
import useMenuOpen from "../../useMenuOpen";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const ThemeItem = () => {
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const themeKey = useSelector((state) => state.present.theme.id);

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
        <Palette style={{ color: theme.palette.primary.main }} />
      </ListItemIcon>
      <ListItemText
        primary={intl.formatMessage(themeMessages.label)}
        secondary={themes[themeKey].name(intl)}
      />
    </ListItem>
  );
};

export default ThemeItem;
