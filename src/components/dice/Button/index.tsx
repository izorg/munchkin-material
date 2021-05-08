import { Tooltip } from "@material-ui/core";
import { IconButtonProps } from "@material-ui/core/IconButton/IconButton";
import { DiceMultiple } from "mdi-material-ui";
import { defineMessages, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { throwDice } from "../../../ducks/dice";
import { stringifyQuery } from "../../../utils/location";
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
    navigate({
      ...location,
      search: stringifyQuery({ dice: null }),
    });
  };

  return (
    <Tooltip title={intl.formatMessage(messages.dice)}>
      <TopIconButton {...props} onClick={onClick}>
        <DiceMultiple />
      </TopIconButton>
    </Tooltip>
  );
};

export default DiceIconButton;
