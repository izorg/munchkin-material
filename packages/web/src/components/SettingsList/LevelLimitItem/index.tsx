import { mdiArrowExpandVertical } from "@mdi/js";
import { ListItem, ListItemIcon, SvgIcon } from "@mui/material";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router";

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
  const [, setSearchParams] = useSearchParams();

  const epic = usePresentSelector((state) => state.settings.epic);
  const levelLimit = usePresentSelector((state) => state.settings.levelLimit);

  const onClick = () => {
    setSearchParams((searchParams) => {
      searchParams.set("levelLimit", "");

      return searchParams;
    });
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
            <path d={mdiArrowExpandVertical} />
          </SvgIcon>
        </ListItemIcon>
        <ListItemText
          primary={intl.formatMessage(levelLimitMessages.label)}
          secondary={secondary}
          slotProps={{
            primary: { noWrap: true },
            secondary: { noWrap: true },
          }}
        />
      </SettingsListItemButton>
    </ListItem>
  );
};

export default LevelLimitItem;
