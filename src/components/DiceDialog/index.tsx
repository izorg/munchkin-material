import {
  mdiDice1,
  mdiDice2,
  mdiDice3,
  mdiDice4,
  mdiDice5,
  mdiDice6,
} from "@mdi/js";
import {
  Box,
  ButtonBase,
  Dialog,
  type DialogProps,
  SvgIcon,
  useTheme,
  Zoom,
} from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { SwitchTransition } from "react-transition-group";

import { throwDice } from "../../ducks/dice";
import { useAppDispatch } from "../../store";
import { useGoBack } from "../../utils/location";
import usePresentSelector from "../../utils/usePresentSelector";

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
  const dispatch = useAppDispatch();
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
      <ButtonBase
        autoFocus
        disableRipple
        onClick={onDiceClick}
        sx={{
          color: theme.palette.text.primary,
          display: "block",
          fontSize: diceSize,
          height: diceSize,
          padding: 0,
          position: "relative",
          width: diceSize,
        }}
      >
        <SwitchTransition>
          <Zoom key={attempt} appear={false}>
            <Box
              component="span"
              sx={{
                height: "100%",
                left: 0,
                position: "absolute",
                top: 0,
                width: "100%",
              }}
            >
              <SvgIcon
                sx={{
                  display: "block",
                  fontSize: "inherit",
                }}
              >
                <path d={diceIcon} />
              </SvgIcon>
            </Box>
          </Zoom>
        </SwitchTransition>
      </ButtonBase>
    </Dialog>
  );
};

export default DiceDialog;
