import { mdiCellphoneArrowDown, mdiInformationOutline } from "@mdi/js";
import { ListItem, ListItemIcon, SvgIcon } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { useVersion } from "../../../utils/versionContext";
import { useWorkbox } from "../../WorkboxProvider";
import ListItemText from "../ItemText";
import { SettingsListItemButton } from "../SettingsListItemButton";

const VersionItem = () => {
  const { applyUpdate, update } = useWorkbox();

  const onClick = () => {
    if (update) {
      applyUpdate();
    }
  };

  return (
    <ListItem disablePadding>
      <SettingsListItemButton onClick={onClick}>
        <ListItemIcon>
          <SvgIcon>
            <path d={update ? mdiCellphoneArrowDown : mdiInformationOutline} />
          </SvgIcon>
        </ListItemIcon>
        <ListItemText
          primary={<FormattedMessage defaultMessage="Version" id="I3b4hn" />}
          secondary={useVersion()}
        />
      </SettingsListItemButton>
    </ListItem>
  );
};

export default VersionItem;
