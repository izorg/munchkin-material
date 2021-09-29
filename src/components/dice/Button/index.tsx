import { mdiDiceMultiple } from "@mdi/js";
import { IconButtonProps, SvgIcon, Tooltip } from "@mui/material";
import { defineMessages, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { throwDice } from "../../../ducks/dice";
import TopIconButton from "../../TopIconButton";

const messages = defineMessages({
  dice: {
    defaultMessage: "Dice",
    id: "dice",
  },
});

const DiceIconButton = (
  props: Omit<IconButtonProps, "onClick">
): JSX.Element => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(throwDice());

    const searchParams = new URLSearchParams(location.search);

    searchParams.set("dice", "");

    navigate({
      search: `?${searchParams.toString()}`,
    });
  };

  return (
    <Tooltip title={intl.formatMessage(messages.dice)}>
      <TopIconButton {...props} onClick={onClick}>
        <SvgIcon>
          <path d={mdiDiceMultiple} />
        </SvgIcon>
      </TopIconButton>
    </Tooltip>
  );
};

export default DiceIconButton;
