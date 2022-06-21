import { mdiAccountMultipleOutline, mdiAccountOutline } from "@mdi/js";
import { ListItemIcon, SvgIcon, Switch } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { setSingleMode } from "../../../ducks/settings";
import usePresentSelector from "../../../hooks/usePresentSelector";
import { useAppDispatch } from "../../../store";
import { useFullVersion } from "../../FullVersionProvider";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const SingleModeItem = () => {
  const dispatch = useAppDispatch();

  const singleMode = usePresentSelector((state) => state.settings.singleMode);

  const { buyFullVersion, fullVersion } = useFullVersion();

  const onChange = async (isSingleMode: boolean) => {
    if (isSingleMode && !fullVersion) {
      try {
        await buyFullVersion();
      } catch (error) {
        return;
      }
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
