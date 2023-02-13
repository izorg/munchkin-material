import { mdiCloudDownloadOutline } from "@mdi/js";
import { ListItemIcon, SvgIcon } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { useFullVersion } from "../../../utils/fullVersionContext";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const RestorePurchasesItem = () => {
  const { cordova, store } = window;

  const { fullVersion } = useFullVersion();

  if (fullVersion || cordova?.platformId !== "ios") {
    return null;
  }

  return (
    <ListItem button onClick={() => store?.refresh()}>
      <ListItemIcon>
        <SvgIcon>
          <path d={mdiCloudDownloadOutline} />
        </SvgIcon>
      </ListItemIcon>
      <ListItemText
        primary={
          <FormattedMessage
            defaultMessage="Restore purchases"
            id="menu.restorePurchases"
          />
        }
      />
    </ListItem>
  );
};

export default RestorePurchasesItem;
