import { css } from "@emotion/react";
import { ButtonBase, Dialog, DialogProps, useTheme } from "@material-ui/core";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "mdi-material-ui";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TransitionGroup } from "react-transition-group";

import { throwDice } from "../../../ducks/dice";
import { useGoBack, useLocationQuery } from "../../../utils/location";
import usePresentSelector from "../../../utils/usePresentSelector";
import DiceTransition from "../Transition";

const diceSize = 120;

const diceComponent = {
  1: Dice1,
  2: Dice2,
  3: Dice3,
  4: Dice4,
  5: Dice5,
  6: Dice6,
};

const DiceDialog = (props: Partial<DialogProps>): JSX.Element | null => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [attempt, setAttempt] = useState(0);

  const dice = usePresentSelector((state) => state.dice);
  const open = useLocationQuery().dice !== undefined;
  const goBack = useGoBack();

  if (dice === null) {
    return null;
  }

  const Dice = diceComponent[dice];

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
            <Dice
              css={css`
                display: block;
                font-size: inherit;
              `}
            />
          </span>
        </DiceTransition>
      </TransitionGroup>
    </Dialog>
  );
};

export default DiceDialog;
