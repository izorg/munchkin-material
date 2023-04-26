import { mdiPlus } from "@mdi/js";
import { type FabProps, SvgIcon } from "@mui/material";
import { forwardRef, useCallback } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";

import ScreenFab from "../../ScreenFab";

const PlayerAddButton = forwardRef<HTMLButtonElement, FabProps>(
  function PlayerAddButton(props, ref) {
    const intl = useIntl();
    const [, setSearchParams] = useSearchParams();

    const onClick = useCallback(() => {
      setSearchParams((searchParams) => {
        searchParams.set("player", "");

        return searchParams;
      });
    }, [setSearchParams]);

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
