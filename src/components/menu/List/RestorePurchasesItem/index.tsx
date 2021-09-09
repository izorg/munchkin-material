import { ListItemIcon, SvgIcon } from "@material-ui/core";
import { mdiCloudDownloadOutline } from "@mdi/js";
import { FormattedMessage } from "react-intl";

import { useFullVersion } from "../../../FullVersionProvider";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const RestorePurchasesItem = (): JSX.Element | null => {
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
