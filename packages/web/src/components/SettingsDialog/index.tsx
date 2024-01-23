import { useIntl } from "react-intl";

import { useGoBack } from "../../utils/location";
import BackButton from "../BackButton";
import { RouteScreenDialog } from "../RouteScreenDialog";
import SettingsList from "../SettingsList";
import Title from "../Title";
import TopAppBar from "../TopAppBar";

const SettingsDialog = () => {
  const intl = useIntl();

  const goBack = useGoBack();

  return (
    <RouteScreenDialog path="/settings">
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
    </RouteScreenDialog>
  );
};

export default SettingsDialog;
