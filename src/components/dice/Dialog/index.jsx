import { ButtonBase, Dialog, makeStyles } from "@material-ui/core";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "mdi-material-ui";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransitionGroup } from "react-transition-group";

import { throwDice } from "../../../ducks/dice";
import { useGoBack, useLocationQuery } from "../../../utils/location";
import DiceTransition from "../Transition";

const displayName = "DiceDialog";

const diceSize = 120;

const useStyles = makeStyles(
  /* eslint-disable sort-keys */
  (theme) => ({
    button: {
      color: theme.palette.text.primary,
      display: "block",
      fontSize: diceSize,
      height: diceSize,
      padding: 0,
      position: "relative",
      width: diceSize,
    },

    iconWrapper: {
      height: "100%",
      left: 0,
      position: "absolute",
      top: 0,
      width: "100%",
    },

    icon: {
      display: "block",
      fontSize: "inherit",
    },
  }),
  /* eslint-enable */
  { name: displayName }
);

const diceComponent = {
  1: Dice1,
  2: Dice2,
  3: Dice3,
  4: Dice4,
  5: Dice5,
  6: Dice6,
};

const DiceDialog = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [attempt, setAttempt] = useState(0);

  const dice = useSelector((state) => state.present.dice);
  const open = useLocationQuery().dice !== undefined;
  const goBack = useGoBack();

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
        className={classes.button}
        component={ButtonBase}
        disableRipple
        onClick={onDiceClick}
      >
        {dice && (
          <DiceTransition key={attempt}>
            <span className={classes.iconWrapper}>
              <Dice className={classes.icon} />
            </span>
          </DiceTransition>
        )}
      </TransitionGroup>
    </Dialog>
  );
};

DiceDialog.displayName = displayName;

export default DiceDialog;
