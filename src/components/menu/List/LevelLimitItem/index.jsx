import { css } from "@emotion/react";
import { ListItemIcon } from "@material-ui/core";
import { SwapVertical } from "mdi-material-ui";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  MAX_EPIC_LEVEL,
  MAX_LEVEL,
  MIN_LEVEL,
} from "../../../../utils/levelLimit";
import { parseSearch, stringifyQuery } from "../../../../utils/location";
import levelLimitMessages from "../../../levelLimit/messages";
import useMenuOpen from "../../useMenuOpen";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const LevelLimitItem = () => {
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();

  const epic = useSelector((state) => state.present.settings.epic);
  const levelLimit = useSelector((state) => state.present.settings.levelLimit);
  const open = useMenuOpen();

  const onClick = () => {
    const to = {
      ...location,
      search: stringifyQuery({
        ...parseSearch(location.search),
        levelLimit: null,
        menu: undefined,
      }),
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
        <SwapVertical />
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
