import { mdiSwapVertical } from "@mdi/js";
import { ListItem, ListItemIcon, SvgIcon } from "@mui/material";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";

import usePresentSelector from "../../../hooks/usePresentSelector";
import levelLimitMessages from "../../../messages/levelLimit";
import {
  MAX_EPIC_LEVEL,
  MAX_LEVEL,
  MIN_LEVEL,
} from "../../../utils/levelLimit";
import ListItemText from "../ItemText";
import { SettingsListItemButton } from "../SettingsListItemButton";

const LevelLimitItem = () => {
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();

  const epic = usePresentSelector((state) => state.settings.epic);
  const levelLimit = usePresentSelector((state) => state.settings.levelLimit);

  const onClick = () => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set("levelLimit", "");
    searchParams.delete("menu");

    const to = {
      search: `?${searchParams.toString()}`,
    };

    navigate(to);
  };

  let secondary = intl.formatMessage(levelLimitMessages.none);

  if (levelLimit) {
    secondary = epic
      ? intl.formatMessage(levelLimitMessages.epic, {
          maxLevel: MAX_EPIC_LEVEL,
          minLevel: MIN_LEVEL,
        })
      : intl.formatMessage(levelLimitMessages.munchkin, {
          maxLevel: MAX_LEVEL,
          minLevel: MIN_LEVEL,
        });
  }

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
      </SettingsListItemButton>
    </ListItem>
  );
};

export default LevelLimitItem;
