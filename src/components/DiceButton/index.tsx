import { mdiDiceMultiple } from "@mdi/js";
import { type IconButtonProps, SvgIcon, Tooltip } from "@mui/material";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";

import { throwDice } from "../../ducks/dice";
import { useAppDispatch } from "../../store";
import TopIconButton from "../TopIconButton";

const DiceIconButton = (props: Omit<IconButtonProps, "onClick">) => {
  const dispatch = useAppDispatch();
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
    <Tooltip
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
