import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { GENDER, Player } from 'munchkin';

import actions from '../../actions';
import PlayerForm from '../../components/Player/Form';

const getInitialValues = ({ app: { activePlayerId }, players }) => {
  const initialValues = {};

  if (activePlayerId !== null) {
    const selectedPlayer = players.find(player => player.id === activePlayerId);

    if (selectedPlayer) {
      Object.assign(initialValues, selectedPlayer);
    }
  } else {
    Object.assign(initialValues, {
      gender: GENDER.MALE,
    });
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
  onSubmit: ({ name, gender }, reduxDispatch, { params: { id } }) => {
    if (name && name.trim()) {
      let player;

      if (id) {
        player = new Player({
          id: parseInt(id, 10),
          name,
          gender,
        });
        dispatch(actions.updatePlayer(player));
      } else {
        player = new Player({ name, gender });
        dispatch(actions.addPlayer(player));
      }

      dispatch(actions.setActivePlayer(player.id));
    }

    dispatch(goBack());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerForm);
