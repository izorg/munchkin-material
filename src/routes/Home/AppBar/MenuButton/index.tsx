import { mdiMenu } from "@mdi/js";
import {
  IconButtonProps,
  SvgIcon,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import TopIconButton from "../../../../components/TopIconButton";
import { toggleMenu } from "../../../../ducks/ui";

const MenuButton = (props: IconButtonProps) => {
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
    <Tooltip
      title={intl.formatMessage({
        defaultMessage: "Menu",
        id: "menu",
      })}
    >
      <TopIconButton data-screenshots="menu" onClick={onClick} {...props}>
        <SvgIcon>
          <path d={mdiMenu} />
        </SvgIcon>
      </TopIconButton>
    </Tooltip>
  );
};

export default MenuButton;
