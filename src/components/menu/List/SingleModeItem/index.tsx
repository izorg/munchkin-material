import { css } from "@emotion/react";
import { mdiAccountMultipleOutline, mdiAccountOutline } from "@mdi/js";
import { ListItemIcon, SvgIcon, Switch } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { setSingleMode } from "../../../../ducks/settings";
import { useGoBack } from "../../../../utils/location";
import usePresentSelector from "../../../../utils/usePresentSelector";
import { useFullVersion } from "../../../FullVersionProvider";
import useMenuOpen from "../../useMenuOpen";
import ListItem from "../Item";
import ListItemText from "../ItemText";

const SingleModeItem = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const goBack = useGoBack();
  const singleMode = usePresentSelector((state) => state.settings.singleMode);
  const open = useMenuOpen();

  const { buyFullVersion, fullVersion } = useFullVersion();

  const onChange = async (isSingleMode: boolean) => {
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
        <SvgIcon>
          <path
            d={singleMode ? mdiAccountOutline : mdiAccountMultipleOutline}
          />
        </SvgIcon>
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
