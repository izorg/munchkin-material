import { mdiAccountMultipleOutline, mdiAccountOutline } from "@mdi/js";
import { ListItemIcon, SvgIcon, Switch } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { startCombat } from "../../../ducks/combat";
import { addPlayer } from "../../../ducks/players";
import { setSingleMode, setSingleModePlayer } from "../../../ducks/settings";
import usePresentSelector from "../../../hooks/usePresentSelector";
import { useAppDispatch } from "../../../store";
import createPlayer from "../../../utils/createPlayer";
import { useFullVersion } from "../../../utils/fullVersionContext";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const SingleModeItem = () => {
  const dispatch = useAppDispatch();

  const singleMode = usePresentSelector((state) => state.settings.singleMode);

  let singleModePlayerId = usePresentSelector(
    (state) => state.settings.singleModePlayerId
  );

  const { buyFullVersion, fullVersion } = useFullVersion();

  const onChange = async (isSingleMode: boolean) => {
    if (isSingleMode && !fullVersion) {
      try {
        await buyFullVersion();
      } catch {
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
    <ListItem
      button
      data-screenshots="single-mode-item"
      onClick={() => onChange(!singleMode)}
      sx={{
        paddingBottom: "9px",
        paddingTop: "9px",
      }}
    >
      <ListItemIcon>
        <SvgIcon>
          <path
            d={singleMode ? mdiAccountOutline : mdiAccountMultipleOutline}
          />
        </SvgIcon>
      </ListItemIcon>
      <ListItemText
        primary={
          <FormattedMessage defaultMessage="Single mode" id="menu.singleMode" />
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
    </ListItem>
  );
};

export default SingleModeItem;
