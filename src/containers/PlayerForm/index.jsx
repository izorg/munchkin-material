import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { goBack } from 'react-router-redux';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';
import GENDER from 'munchkin-core/es/constants/gender';

import { importContact, submitPlayer } from '../../actions';
import Form from '../../components/Player/Form';
import getRandomMaterialColor from '../../helpers/getRandomMaterialColor';

const getInitialValues = ({ app: { activePlayerId }, playerColors, players }) => {
  let initialValues = {
    gender: GENDER.MALE,
  };

  if (activePlayerId) {
    const selectedPlayer = players[activePlayerId];

    if (selectedPlayer) {
      initialValues = {
        ...initialValues,
        ...selectedPlayer,
        color: playerColors[activePlayerId],
      };
    }
  } else {
    initialValues = {
      ...initialValues,
      color: getRandomMaterialColor(),
    };
  }

  return initialValues;
};

const mapStateToProps = state => ({
  autoFocus: !state.app.activePlayerId,
  initialValues: getInitialValues(state),
  newPlayer: !state.app.activePlayerId,
  path: state.app.activePlayerId ? '/edit/:id' : '/new',
  title: state.app.activePlayerId ?
    <FormattedMessage id="player.form.titleEdit" defaultMessage="Edit munchkin" /> :
    <FormattedMessage id="player.form.title" defaultMessage="New munchkin" />,
});

const mapDispatchToProps = {
  onCancel: goBack,
  onImport: importContact,
  onSubmit: submitPlayer,
};

const PlayerForm = ({ path, ...props }) => (
  <Route path={path}>
    {({ match }) => (
      <Slide
        appear={false}
        direction="up"
        in={Boolean(match)}
        mountOnEnter
        unmountOnExit
      >
        <Form {...props} />
      </Slide>
    )}
  </Route>
);

PlayerForm.propTypes = {
  path: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerForm);
