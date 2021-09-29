import { mdiMenu } from "@mdi/js";
import { SvgIcon, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { defineMessages, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import TopIconButton from "../../../../components/TopIconButton";
import { toggleMenu } from "../../../../ducks/ui";

const displayName = "MenuButton";

const messages = defineMessages({
  menu: {
    defaultMessage: "Menu",
    id: "menu",
  },
});

const MenuButton = (props) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const onClick = () => {
    if (mdUp) {
      dispatch(toggleMenu());
    } else {
      const searchParams = new URLSearchParams(location.search);

      searchParams.set("menu", "");

      navigate({
        search: `?${searchParams.toString()}`,
      });
    }
  };

  return (
    <Tooltip title={intl.formatMessage(messages.menu)}>
      <TopIconButton data-screenshots="menu" onClick={onClick} {...props}>
        <SvgIcon>
          <path d={mdiMenu} />
        </SvgIcon>
      </TopIconButton>
    </Tooltip>
  );
};

MenuButton.displayName = displayName;

export default MenuButton;
