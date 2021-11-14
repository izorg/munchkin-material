import { css } from "@emotion/react";
import {
  mdiDice1,
  mdiDice2,
  mdiDice3,
  mdiDice4,
  mdiDice5,
  mdiDice6,
} from "@mdi/js";
import {
  ButtonBase,
  Dialog,
  DialogProps,
  SvgIcon,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";

import { throwDice } from "../../../ducks/dice";
import { useGoBack } from "../../../utils/location";
import usePresentSelector from "../../../utils/usePresentSelector";
import DiceTransition from "../Transition";

const diceSize = 120;

const diceIcons = {
  1: mdiDice1,
  2: mdiDice2,
  3: mdiDice3,
  4: mdiDice4,
  5: mdiDice5,
  6: mdiDice6,
};

const DiceDialog = (props: Partial<DialogProps>) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useTheme();

  const [attempt, setAttempt] = useState(0);

  const dice = usePresentSelector((state) => state.dice);
  const open = new URLSearchParams(location.search).get("dice") !== null;
  const goBack = useGoBack();

  if (dice === null) {
    return null;
  }

  const diceIcon = diceIcons[dice];

  const onDiceClick = () => {
    dispatch(throwDice());

    setAttempt(attempt + 1);
  };

  const onDialogClose = () => goBack();

  return (
    <Dialog {...props} onClose={onDialogClose} open={open}>
      <TransitionGroup
        autoFocus
        component={ButtonBase}
        css={css`
          color: ${theme.palette.text.primary};
          display: block;
          font-size: ${diceSize}px;
          height: ${diceSize}px;
          padding: 0;
          position: relative;
          width: ${diceSize}px;
        `}
        disableRipple
        onClick={onDiceClick}
      >
        <DiceTransition key={attempt}>
          <span
            css={css`
              height: 100%;
              left: 0;
              position: absolute;
              top: 0;
              width: 100%;
            `}
          >
            <SvgIcon
              css={css`
                display: block;
                font-size: inherit;
              `}
            >
              <path d={diceIcon} />
            </SvgIcon>
          </span>
        </DiceTransition>
      </TransitionGroup>
    </Dialog>
  );
};

export default DiceDialog;
