import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { GENDER } from 'munchkin-core';

import { importContact, submitPlayer } from '../../actions';
import PlayerForm from '../../components/Player/Form';

const getInitialValues = ({ app: { activePlayerId }, players }) => {
  const initialValues = {
    gender: GENDER.MALE,
  };

  if (activePlayerId) {
    const selectedPlayer = players[activePlayerId];

    if (selectedPlayer) {
      Object.assign(initialValues, selectedPlayer);
    }
  }

  return initialValues;
};

const mapStateToProps = state => ({
  autoFocus: !state.app.activePlayerId,
  initialValues: getInitialValues(state),
  newPlayer: !state.app.activePlayerId,
  title: state.app.activePlayerId ?
    <FormattedMessage id="player.form.titleEdit" defaultMessage="Edit munchkin" /> :
    <FormattedMessage id="player.form.title" defaultMessage="New munchkin" />,
});

const mapDispatchToProps = {
  onCancel: goBack,
  onImport: importContact,
  onSubmit: submitPlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerForm);
