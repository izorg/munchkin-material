import React from 'react';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { IconButton, Tooltip, withStyles } from '@material-ui/core';
import { Check, Close, Delete, Edit } from '@material-ui/icons';
import { FlagCheckered } from 'mdi-material-ui';
import { noop } from 'lodash/fp';

import AppBar from '../../../components/AppBar';
import DiceButton from '../../../components/dice/Button';
import Title from '../../../components/Title';

import * as modes from '../modes';
import modeShape from '../modeShape';

import MenuButton from './MenuButton';
import ResetButton from './ResetButton';

const messages = defineMessages({
  edit: {
    id: 'player.list.edit',
    defaultMessage: 'Edit',
  },

  reset: {
    id: 'player.list.reset',
    defaultMessage: 'Reset',
  },
});

const styles = {
  leftButton: {
    marginRight: 8,
  },

  title: {
    marginLeft: 12,
  },
};

const HomeAppBar = ({
  classes,
  empty,
  intl,
  mode,
  onMultiSelectDeactivate,
  onPlayersDelete,
  onToggleEditClick,
  onTurnFinish,
  selectedPlayerIds,
  singleMode,
}) => {
  const editMode = mode === modes.EDIT;
  const multiMode = mode === modes.MULTI;
  const buttonColor = multiMode ? 'default' : 'inherit';

  const editTitle = intl.formatMessage(messages.edit);

  let title = (
    <FormattedMessage id="player.list.title" defaultMessage="Munchkins" />
  );

  if (multiMode) {
    title = selectedPlayerIds.length;
  }

  if (singleMode) {
    title = (
      <FormattedMessage id="home.single.title" defaultMessage="Munchkin" />
    );
  }

  return (
    <AppBar color={multiMode ? 'default' : 'primary'}>
      {multiMode ? (
        <IconButton
          className={classes.leftButton}
          color="default"
          onClick={onMultiSelectDeactivate}
        >
          <Close />
        </IconButton>
      ) : (
        <MenuButton className={classes.leftButton} color="inherit" />
      )}
      <Title
        color={multiMode ? 'default' : 'inherit'}
        className={classes.title}
      >
        {title}
      </Title>

      {(singleMode || (!mode && !empty)) && <ResetButton />}

      {(!mode || singleMode) && <DiceButton color={buttonColor} />}

      {!empty && !multiMode && !singleMode && (
        <Tooltip title={editTitle}>
          <IconButton
            aria-label={editTitle}
            color={buttonColor}
            onClick={() => onToggleEditClick(mode)}
          >
            {editMode ? <Check /> : <Edit />}
          </IconButton>
        </Tooltip>
      )}

      {multiMode && (
        <IconButton
          color={buttonColor}
          onClick={() => onPlayersDelete(selectedPlayerIds)}
        >
          <Delete />
        </IconButton>
      )}

      {singleMode && (
        <IconButton color="inherit" onClick={onTurnFinish}>
          <FlagCheckered />
        </IconButton>
      )}
    </AppBar>
  );
};

HomeAppBar.propTypes = {
  empty: PropTypes.bool,
  intl: intlShape.isRequired,
  mode: modeShape,
  onMultiSelectDeactivate: PropTypes.func,
  onPlayersDelete: PropTypes.func,
  onToggleEditClick: PropTypes.func,
  onTurnFinish: PropTypes.func,
  selectedPlayerIds: PropTypes.arrayOf(PropTypes.string),
  singleMode: PropTypes.bool,
};

HomeAppBar.defaultProps = {
  empty: false,
  mode: null,
  onMultiSelectDeactivate: noop,
  onPlayersDelete: noop,
  onToggleEditClick: noop,
  onTurnFinish: noop,
  selectedPlayerIds: [],
  singleMode: false,
};

export default compose(
  injectIntl,
  withStyles(styles),
)(HomeAppBar);
