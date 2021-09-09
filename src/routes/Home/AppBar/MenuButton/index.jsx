import { SvgIcon, Tooltip, useMediaQuery, useTheme } from "@material-ui/core";
import { mdiMenu } from "@mdi/js";
import { defineMessages, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import TopIconButton from "../../../../components/TopIconButton";
import { toggleMenu } from "../../../../ducks/ui";
import { stringifyQuery, useLocationQuery } from "../../../../utils/location";

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

  const query = useLocationQuery();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const onClick = () =>
    mdUp
      ? dispatch(toggleMenu())
      : navigate({
          ...location,
          search: stringifyQuery({
            ...query,
            menu: null,
          }),
        });

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
