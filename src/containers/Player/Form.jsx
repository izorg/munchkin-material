import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { GENDER, Player } from 'munchkin';
import { addPlayer, updatePlayer } from 'munchkin/lib/actions';

import { setActivePlayer } from '../../actions';
import PlayerForm from '../../components/Player/Form';

const getInitialValues = ({ app: { activePlayerId }, players }) => {
  const initialValues = {
    gender: GENDER.MALE,
  };

  if (activePlayerId) {
    const selectedPlayer = players.find(player => player.id === activePlayerId);

    if (selectedPlayer) {
      Object.assign(initialValues, selectedPlayer);
    }
  }

  return initialValues;
};

const mapStateToProps = state => ({
  autoFocus: !state.app.activePlayerId,
  initialValues: getInitialValues(state),
  title: state.app.activePlayerId ?
    <FormattedMessage id="player.form.titleEdit" defaultMessage="Edit munchkin" /> :
    <FormattedMessage id="player.form.title" defaultMessage="New munchkin" />,
});

const mapDispatchToProps = dispatch => ({
  onCancel: () => dispatch(goBack()),
  onSubmit: (values) => {
    const { id, name } = values;

    if (name && name.trim()) {
      const player = new Player(values);

      if (id) {
        dispatch(updatePlayer(player));
      } else {
        dispatch(addPlayer(player));
      }

      dispatch(setActivePlayer(player.id));
    }

    dispatch(goBack());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerForm);
