import { ListItemIcon } from "@material-ui/core";
import { Star } from "mdi-material-ui";
import { FormattedMessage } from "react-intl";

import { useGoBack } from "../../../../utils/location";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const getRateLink = (platformId: string) => {
  switch (platformId) {
    case "android":
      return "market://details?id=com.izorg.munchkin";

    case "ios":
      return "itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=1448937097";

    default:
      return null;
  }
};

const RateItem = (): JSX.Element | null => {
  const goBack = useGoBack();

  const rateLink = getRateLink(window.cordova?.platformId);

  if (!rateLink) {
    return null;
  }

  const onClick = () => goBack();

  return (
    <ListItem
      button
      component="a"
      href={rateLink}
      onClick={onClick}
      target="_blank"
    >
      <ListItemIcon>
        <Star />
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
