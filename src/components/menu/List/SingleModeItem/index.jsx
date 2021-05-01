import { css } from "@emotion/react";
import { ListItemIcon, Switch } from "@material-ui/core";
import { Account, AccountMultiple } from "mdi-material-ui";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { setSingleMode } from "../../../../ducks/settings";
import { useGoBack } from "../../../../utils/location";
import { useFullVersion } from "../../../FullVersionProvider";
import useMenuOpen from "../../useMenuOpen";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const SingleModeItem = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const goBack = useGoBack();
  const singleMode = useSelector((state) => state.present.settings.singleMode);
  const open = useMenuOpen();

  const { buyFullVersion, fullVersion } = useFullVersion();

  const onChange = async (isSingleMode) => {
    const needBack = open || pathname !== "/";

    if (isSingleMode && !fullVersion) {
      try {
        await buyFullVersion();
      } catch (error) {
        return;
      }
    }

    dispatch(setSingleMode(isSingleMode));

    if (needBack) {
      goBack();
    }
  };

  return (
    <ListItem
      button
      css={css`
        padding-bottom: 9px;
        padding-top: 9px;
      `}
      data-screenshots="single-mode-item"
      onClick={() => onChange(!singleMode)}
    >
      <ListItemIcon>
        {singleMode ? <Account /> : <AccountMultiple />}
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
