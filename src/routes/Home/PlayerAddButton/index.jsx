import { mdiPlus } from "@mdi/js";
import { SvgIcon } from "@mui/material";
import { forwardRef } from "react";
import { defineMessages, useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";

import ScreenFab from "../../../components/ScreenFab";
import { parseSearch, stringifyQuery } from "../../../utils/location";

const displayName = "PlayerAddButton";

const messages = defineMessages({
  label: {
    defaultMessage: "Add",
    id: "mainButton.label",
  },
});

const PlayerAddButton = forwardRef((props, ref) => {
  const location = useLocation();
  const navigate = useNavigate();
  const intl = useIntl();

  const onClick = () => {
    const query = parseSearch(location.search);

    navigate({
      ...location,
      search: stringifyQuery({
        ...query,
        player: null,
      }),
    });
  };

  return (
    <ScreenFab
      ref={ref}
      aria-label={intl.formatMessage(messages.label)}
      onClick={onClick}
      {...props}
    >
      <SvgIcon>
        <path d={mdiPlus} />
      </SvgIcon>
    </ScreenFab>
  );
});

PlayerAddButton.displayName = displayName;

export default PlayerAddButton;
