import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { FlagCheckered } from 'mdi-material-ui';
import { noop } from 'lodash/fp';

import AppBar from '../../../components/TopAppBar';
import BackButton from '../../../components/BackButton';
import DiceIconButton from '../../../components/dice/Button';
import Title from '../../../components/Title';
import TopIconButton from '../../../components/TopIconButton';

const useStyles = makeStyles(
  (theme) => ({
    leftButton: {
      marginRight: 8,

      [theme.breakpoints.down('sm')]: {
        marginRight: 12,
      },
    },

    title: {
      marginLeft: 12,
    },
  }),
  { name: 'CombatAppBar' },
);

const CombatAppBar = ({ onBack, onFinish }) => {
  const classes = useStyles();

  return (
    <AppBar>
      <BackButton
        className={classes.leftButton}
        data-screenshots="combat-back-button"
        onClick={onBack}
      />

      <Title className={classes.title}>
        <FormattedMessage defaultMessage="Combat" id="combat" />
      </Title>

      <DiceIconButton color="inherit" />

      <TopIconButton color="inherit" onClick={onFinish}>
        <FlagCheckered />
      </TopIconButton>
    </AppBar>
  );
};

CombatAppBar.propTypes = {
  onBack: PropTypes.func,
  onFinish: PropTypes.func,
};

CombatAppBar.defaultProps = {
  onBack: noop,
  onFinish: noop,
};

export default CombatAppBar;
