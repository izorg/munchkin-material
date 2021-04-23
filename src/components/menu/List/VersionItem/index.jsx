import { ListItemIcon } from "@material-ui/core";
import { CellphoneArrowDown, InformationOutline } from "mdi-material-ui";

import { useGoBack } from "../../../../utils/location";
import version from "../../../../utils/version";
import { useWorkbox } from "../../../WorkboxProvider";
import useMenuOpen from "../../useMenuOpen";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const displayName = "VersionItem";

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
        {update ? <CellphoneArrowDown /> : <InformationOutline />}
      </ListItemIcon>
      <ListItemText primary={version} />
    </ListItem>
  );
};

VersionItem.displayName = displayName;

export default VersionItem;
