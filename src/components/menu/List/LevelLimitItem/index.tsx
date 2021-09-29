import { css } from "@emotion/react";
import { mdiSwapVertical } from "@mdi/js";
import { ListItemIcon, SvgIcon } from "@mui/material";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";

import {
  MAX_EPIC_LEVEL,
  MAX_LEVEL,
  MIN_LEVEL,
} from "../../../../utils/levelLimit";
import usePresentSelector from "../../../../utils/usePresentSelector";
import levelLimitMessages from "../../../levelLimit/messages";
import useMenuOpen from "../../useMenuOpen";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const LevelLimitItem = (): JSX.Element => {
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();

  const epic = usePresentSelector((state) => state.settings.epic);
  const levelLimit = usePresentSelector((state) => state.settings.levelLimit);
  const open = useMenuOpen();

  const onClick = () => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set("levelLimit", "");
    searchParams.delete("menu");

    const to = {
      search: `?${searchParams.toString()}`,
    };

    if (open) {
      navigate(to, { replace: true });
    } else {
      navigate(to);
    }
  };

  let secondary = intl.formatMessage(levelLimitMessages.none);

  if (levelLimit) {
    if (epic) {
      secondary = intl.formatMessage(levelLimitMessages.epic, {
        maxLevel: MAX_EPIC_LEVEL,
        minLevel: MIN_LEVEL,
      });
    } else {
      secondary = intl.formatMessage(levelLimitMessages.munchkin, {
        maxLevel: MAX_LEVEL,
        minLevel: MIN_LEVEL,
      });
    }
  }

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
        <SvgIcon>
          <path d={mdiSwapVertical} />
        </SvgIcon>
      </ListItemIcon>
      <ListItemText
        primary={intl.formatMessage(levelLimitMessages.label)}
        primaryTypographyProps={{ noWrap: true }}
        secondary={secondary}
        secondaryTypographyProps={{ noWrap: true }}
      />
    </ListItem>
  );
};

export default LevelLimitItem;
