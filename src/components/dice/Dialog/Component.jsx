import React, { useState } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import PropTypes from 'prop-types';
import { ButtonBase, Dialog, withStyles } from '@material-ui/core';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'mdi-material-ui';

import DiceTransition from '../Transition';

const diceSize = 120;

const styles = (theme) => ({
  button: {
    color: theme.palette.text.primary,
    display: 'block',
    fontSize: diceSize,
    height: diceSize,
    padding: 0,
    position: 'relative',
    width: diceSize,
  },

  iconWrapper: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },

  icon: {
    display: 'block',
    fontSize: 'inherit',
  },
});

const diceComponent = {
  1: Dice1,
  2: Dice2,
  3: Dice3,
  4: Dice4,
  5: Dice5,
  6: Dice6,
};

const DiceDialog = ({ classes, dice, onDiceClick, ...rest }) => {
  const [attempt, setAttempt] = useState(0);

  const handleDiceClick = () => {
    onDiceClick();

    setAttempt(attempt + 1);
  };

  const Dice = diceComponent[dice];

  return (
    <Dialog disableRestoreFocus {...rest}>
      <TransitionGroup
        autoFocus
        className={classes.button}
        component={ButtonBase}
        disableRipple
        onClick={handleDiceClick}
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

DiceDialog.propTypes = {
  dice: PropTypes.number,
  onDiceClick: PropTypes.func.isRequired,
};

DiceDialog.defaultProps = {
  dice: null,
};

export default withStyles(styles)(DiceDialog);
