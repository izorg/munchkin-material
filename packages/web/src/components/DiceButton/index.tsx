import { mdiDiceMultiple } from "@mdi/js";
import { type IconButtonProps, SvgIcon, Tooltip } from "@mui/material";
import { useCallback } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router";

import { throwDice } from "../../ducks/dice";
import { useAppDispatch } from "../../store";
import TopIconButton from "../TopIconButton";

const DiceIconButton = (props: Omit<IconButtonProps, "onClick">) => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const [, setSearchParams] = useSearchParams();

  const onClick = useCallback(() => {
    dispatch(throwDice());

    setSearchParams((searchParams) => {
      searchParams.set("dice", "");

      return searchParams;
    });
  }, [dispatch, setSearchParams]);

  return (
    <Tooltip
      // eslint-disable-next-line formatjs/enforce-id
      title={intl.formatMessage({
        defaultMessage: "Dice",
        id: "dice",
      })}
    >
      <TopIconButton {...props} onClick={onClick}>
        <SvgIcon>
          <path d={mdiDiceMultiple} />
        </SvgIcon>
      </TopIconButton>
    </Tooltip>
  );
};

export default DiceIconButton;
