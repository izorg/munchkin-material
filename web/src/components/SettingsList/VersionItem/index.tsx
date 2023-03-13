import { mdiCellphoneArrowDown, mdiInformationOutline } from "@mdi/js";
import { ListItemIcon, SvgIcon } from "@mui/material";

import { useVersion } from "../../../utils/versionContext";
import { useWorkbox } from "../../WorkboxProvider";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const VersionItem = () => {
  const { applyUpdate, update } = useWorkbox();

  const onClick = () => {
    if (update) {
      applyUpdate();
    }
  };

  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        <SvgIcon>
          <path d={update ? mdiCellphoneArrowDown : mdiInformationOutline} />
        </SvgIcon>
      </ListItemIcon>
      <ListItemText primary={useVersion()} />
    </ListItem>
  );
};

export default VersionItem;
