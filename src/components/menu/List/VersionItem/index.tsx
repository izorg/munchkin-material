import { mdiCellphoneArrowDown, mdiInformationOutline } from "@mdi/js";
import { ListItemIcon, SvgIcon } from "@mui/material";

import { useGoBack } from "../../../../utils/location";
import version from "../../../../utils/version";
import { useWorkbox } from "../../../WorkboxProvider";
import useMenuOpen from "../../useMenuOpen";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const VersionItem = () => {
  const goBack = useGoBack();
  const menuOpen = useMenuOpen();

  const { applyUpdate, update } = useWorkbox();

  const onClick = () => {
    if (update) {
      if (menuOpen) {
        goBack();
      }

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
      <ListItemText primary={version} />
    </ListItem>
  );
};

export default VersionItem;
