import { mdiAccountMultipleOutline, mdiAccountOutline } from "@mdi/js";
import { Badge, ListItem, ListItemIcon, SvgIcon, Switch } from "@mui/material";
import { captureException } from "@sentry/react";
import { FormattedMessage } from "react-intl";

import { startCombat } from "../../../ducks/combat/actions";
import { addPlayer } from "../../../ducks/players";
import { setSingleMode, setSingleModePlayer } from "../../../ducks/settings";
import usePresentSelector from "../../../hooks/usePresentSelector";
import { useAppDispatch } from "../../../store";
import createPlayer from "../../../utils/createPlayer";
import { useFullVersion } from "../../../utils/fullVersionContext";
import ListItemText from "../ItemText";
import { SettingsListItemButton } from "../SettingsListItemButton";

const SingleModeItem = () => {
  const dispatch = useAppDispatch();

  const singleMode = usePresentSelector((state) => state.settings.singleMode);

  let singleModePlayerId = usePresentSelector(
    (state) => state.settings.singleModePlayerId,
  );

  const { buyFullVersion, fullVersion } = useFullVersion();

  const onChange = async (isSingleMode: boolean) => {
    if (isSingleMode && !fullVersion) {
      try {
        await buyFullVersion();
      } catch (error) {
        captureException(error);

        return;
      }
    }

    if (isSingleMode) {
      if (!singleModePlayerId) {
        const player = createPlayer();

        dispatch(addPlayer(player));
        dispatch(setSingleModePlayer(player.id));

        singleModePlayerId = player.id;
      }

      dispatch(startCombat(singleModePlayerId));
    }

    dispatch(setSingleMode(isSingleMode));
  };

  return (
    <ListItem disablePadding>
      <SettingsListItemButton
        data-screenshots="single-mode-item"
        onClick={() => onChange(!singleMode)}
        sx={{
          paddingBottom: "9px",
          paddingTop: "9px",
        }}
      >
        <ListItemIcon>
          <Badge badgeContent="$" invisible={fullVersion}>
            <SvgIcon>
              <path
                d={singleMode ? mdiAccountOutline : mdiAccountMultipleOutline}
              />
            </SvgIcon>
          </Badge>
        </ListItemIcon>
        <ListItemText
          primary={
            <FormattedMessage
              defaultMessage="Single mode"
              id="menu.singleMode"
            />
          }
          primaryTypographyProps={{ noWrap: true }}
        />
        <Switch
          checked={singleMode}
          color="primary"
          disableRipple
          edge="end"
          tabIndex={-1}
        />
      </SettingsListItemButton>
    </ListItem>
  );
};

export default SingleModeItem;
