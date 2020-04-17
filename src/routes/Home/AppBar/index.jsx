import { Tooltip } from '@material-ui/core';
import { goBack, push } from 'connected-react-router';
import { Check, Close, Delete, FlagCheckered, Pencil } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import DiceButton from '../../../components/dice/Button';
import Title from '../../../components/Title';
import AppBar from '../../../components/TopAppBar';
import TopIconButton from '../../../components/TopIconButton';
import { setCombatPlayerBonus } from '../../../ducks/combat';
import { removePlayerFromList } from '../../../ducks/playerList';
import { removePlayer } from '../../../ducks/players';
import { getQuery, stringifyQuery } from '../../../utils/location';
import { EDIT, MULTI } from '../modes';

import MenuButton from './MenuButton';
import ResetButton from './ResetButton';
import ShuffleButton from './ShuffleButton';

const displayName = 'HomeAppBar';

const messages = defineMessages({
  edit: {
    id: 'player.list.edit',
    defaultMessage: 'Edit',
  },
});

const HomeAppBar = ({ empty, singleMode }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const query = useSelector(getQuery);

  const editMode = query[EDIT] !== undefined;
  const multiMode = query[MULTI] !== undefined;

  const selectedPlayerIds = useSelector((state) => state.app.selectedPlayerIds);

  const onMultiSelectDeactivate = () => dispatch(goBack());

  const onPlayersDelete = (selected) => {
    selected.forEach((id) => {
      dispatch(removePlayerFromList(id));
      dispatch(removePlayer(id));
    });
    dispatch(goBack());
  };

  const onToggleEditClick = () =>
    editMode
      ? dispatch(goBack())
      : dispatch(push({ search: stringifyQuery({ [EDIT]: null }) }));

  const onTurnFinish = () => dispatch(setCombatPlayerBonus(0));

  const editTitle = intl.formatMessage(messages.edit);

  let title = (
    <FormattedMessage defaultMessage="Munchkins" id="player.list.title" />
  );

  if (multiMode) {
    title = selectedPlayerIds.length;
  }

  if (singleMode) {
    title = (
      <FormattedMessage defaultMessage="Munchkin" id="home.single.title" />
    );
  }

  return (
    <AppBar color={multiMode ? 'default' : 'primary'}>
      {multiMode ? (
        <TopIconButton edge="start" onClick={onMultiSelectDeactivate}>
          <Close />
        </TopIconButton>
      ) : (
        <MenuButton edge="start" />
      )}

      <Title>{title}</Title>

      {(singleMode || (!(editMode || multiMode) && !empty)) && (
        <ResetButton edge="end" />
      )}

      {(!(editMode || multiMode) || singleMode) && <DiceButton edge="end" />}

      {editMode && <ShuffleButton edge="end" />}

      {!empty && !multiMode && !singleMode && (
        <Tooltip title={editTitle}>
          <TopIconButton
            aria-label={editTitle}
            edge="end"
            onClick={() => onToggleEditClick()}
          >
            {editMode ? <Check /> : <Pencil />}
          </TopIconButton>
        </Tooltip>
      )}

      {multiMode && (
        <TopIconButton
          edge="end"
          onClick={() => onPlayersDelete(selectedPlayerIds)}
        >
          <Delete />
        </TopIconButton>
      )}

      {singleMode && (
        <TopIconButton edge="end" onClick={onTurnFinish}>
          <FlagCheckered />
        </TopIconButton>
      )}
    </AppBar>
  );
};

HomeAppBar.propTypes = {
  empty: PropTypes.bool,
  singleMode: PropTypes.bool,
};

HomeAppBar.defaultProps = {
  empty: false,
  singleMode: false,
};

HomeAppBar.displayName = displayName;

export default HomeAppBar;
