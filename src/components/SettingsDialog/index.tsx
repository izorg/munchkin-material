import { Box } from "@mui/material";
import { type VFC } from "react";
import { useIntl } from "react-intl";
import { useMatch } from "react-router-dom";

import { useGoBack } from "../../utils/location";
import BackButton from "../BackButton";
import ScreenDialog from "../ScreenDialog";
import SettingsList from "../SettingsList";
import Title from "../Title";
import TopAppBar from "../TopAppBar";

const SettingsDialog: VFC = () => {
  const intl = useIntl();
  const match = useMatch({
    end: false,
    path: "/settings",
  });

  const goBack = useGoBack();

  return (
    <ScreenDialog open={Boolean(match)}>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <TopAppBar>
          <BackButton onClick={goBack} />
          <Title>
            {intl.formatMessage({
              defaultMessage: "Settings",
              id: "settings",
            })}
          </Title>
        </TopAppBar>
        <SettingsList />
      </Box>
    </ScreenDialog>
  );
};

export default SettingsDialog;
