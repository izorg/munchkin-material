import { mdiPlus } from "@mdi/js";
import { type FabProps, SvgIcon } from "@mui/material";
import { forwardRef } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";

import ScreenFab from "../../../components/ScreenFab";

const PlayerAddButton = forwardRef<HTMLButtonElement, FabProps>(
  function PlayerAddButton(props, ref) {
    const intl = useIntl();
    const location = useLocation();
    const navigate = useNavigate();

    const onClick = () => {
      const searchParams = new URLSearchParams(location.search);

      searchParams.set("player", "");

      navigate({
        search: `?${searchParams.toString()}`,
      });
    };

    return (
      <ScreenFab
        ref={ref}
        aria-label={intl.formatMessage({
          defaultMessage: "Add",
          id: "mainButton.label",
        })}
        onClick={onClick}
        {...props}
      >
        <SvgIcon>
          <path d={mdiPlus} />
        </SvgIcon>
      </ScreenFab>
    );
  }
);

export default PlayerAddButton;
