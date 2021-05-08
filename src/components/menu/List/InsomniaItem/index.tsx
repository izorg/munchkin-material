import { css } from "@emotion/react";
import { ListItemIcon, Switch } from "@material-ui/core";
import { Lightbulb, LightbulbOutline } from "mdi-material-ui";
import { FormattedMessage } from "react-intl";

import { useWakeLock } from "../../../WakeLockProvider";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const InsomniaItem = (): JSX.Element | null => {
  const { setWakeLock, wakeLock, wakeLockSupport } = useWakeLock();

  if (!wakeLockSupport) {
    return null;
  }

  return (
    <ListItem
      button
      css={css`
        padding-bottom: 9px;
        padding-top: 9px;
      `}
      onClick={() => setWakeLock(!wakeLock)}
    >
      <ListItemIcon>
        {wakeLock ? <Lightbulb /> : <LightbulbOutline />}
      </ListItemIcon>
      <ListItemText
        primary={
          <FormattedMessage defaultMessage="Keep awake" id="menu.keepAwake" />
        }
      />
      <Switch
        checked={wakeLock}
        color="primary"
        disableRipple
        edge="end"
        tabIndex={-1}
      />
    </ListItem>
  );
};

export default InsomniaItem;
