import { mdiCogOutline } from "@mdi/js";
import { type IconButtonProps, SvgIcon, Tooltip } from "@mui/material";
import { type FC } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import TopIconButton from "../TopIconButton";

const SettingsIconButton: FC<Omit<IconButtonProps, "children">> = (props) => {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <Tooltip
      title={intl.formatMessage({
        defaultMessage: "Settings",
        id: "settings",
      })}
    >
      <TopIconButton
        {...props}
        data-screenshots="settings"
        onClick={() => navigate("/settings")}
      >
        <SvgIcon>
          <path d={mdiCogOutline} />
        </SvgIcon>
      </TopIconButton>
    </Tooltip>
  );
};

export default SettingsIconButton;
