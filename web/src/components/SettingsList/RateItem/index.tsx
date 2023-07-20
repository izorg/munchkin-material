import { mdiStarOutline } from "@mdi/js";
import { ListItemIcon, SvgIcon } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { useAppStoreLink } from "../../../utils/appStoreLinkContext";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const RateItem = () => {
  const { getAppStoreLink } = useAppStoreLink();

  const appStoreLink = getAppStoreLink();

  if (!appStoreLink) {
    return null;
  }

  return (
    <ListItem component="a" href={appStoreLink} target="_blank">
      <ListItemIcon>
        <SvgIcon>
          <path d={mdiStarOutline} />
        </SvgIcon>
      </ListItemIcon>
      <ListItemText
        primary={
          <FormattedMessage defaultMessage="Rate the app" id="menu.rateApp" />
        }
      />
    </ListItem>
  );
};

export default RateItem;
