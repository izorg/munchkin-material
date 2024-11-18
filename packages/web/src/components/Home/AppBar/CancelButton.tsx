import { mdiClose } from "@mdi/js";
import { type IconButtonProps, SvgIcon, Tooltip } from "@mui/material";
import { useIntl } from "react-intl";

import { useGoBack } from "../../../utils/location";
import TopIconButton from "../../TopIconButton";

export const CancelButton = (props: IconButtonProps) => {
  const intl = useIntl();

  const goBack = useGoBack();

  return (
    <Tooltip
      title={intl.formatMessage({
        defaultMessage: "Clear selection",
        id: "EYIw2M",
      })}
    >
      <TopIconButton onClick={goBack} {...props}>
        <SvgIcon>
          <path d={mdiClose} />
        </SvgIcon>
      </TopIconButton>
    </Tooltip>
  );
};
