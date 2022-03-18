import { mdiCogOutline } from "@mdi/js";
import { type IconButtonProps, SvgIcon, Tooltip } from "@mui/material";
import { type VFC } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import TopIconButton from "../TopIconButton";

const SettingsIconButton: VFC<Omit<IconButtonProps, "children">> = (props) => {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <Tooltip
      title={intl.formatMessage({
        defaultMessage: "Settings",
        id: "settings",
      })}
    >
      <TopIconButton {...props} onClick={() => navigate("/settings")}>
        <SvgIcon>
          <path d={mdiCogOutline} />
        </SvgIcon>
      </TopIconButton>
    </Tooltip>
  );
};

export default SettingsIconButton;
