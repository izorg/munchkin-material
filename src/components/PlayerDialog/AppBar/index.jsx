import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Check } from 'mdi-material-ui';
import { noop } from 'lodash/fp';

import AppBar from '../../TopAppBar';
import BackButton from '../../BackButton';
import Title from '../../Title';
import TopIconButton from '../../TopIconButton';

const useStyles = makeStyles(
  {
    leftButton: {
      marginRight: 8,
    },

    title: {
      marginLeft: 12,
    },
  },
  { name: 'PlayerFormScreenAppBarComponent' },
);

const PlayerFormScreenAppBarComponent = ({ onCancel, title }) => {
  const classes = useStyles();

  return (
    <AppBar>
      <BackButton className={classes.leftButton} onClick={onCancel} />

      <Title className={classes.title}>{title}</Title>

      <TopIconButton color="inherit" type="submit">
        <Check />
      </TopIconButton>
    </AppBar>
  );
};

PlayerFormScreenAppBarComponent.propTypes = {
  onCancel: PropTypes.func,
  title: PropTypes.node,
};

PlayerFormScreenAppBarComponent.defaultProps = {
  onCancel: noop,
  title: null,
};

export default PlayerFormScreenAppBarComponent;
