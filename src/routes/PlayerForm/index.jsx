import React from 'react';
import { FormattedMessage } from 'react-intl';
import connect from 'react-redux/es/connect/connect';
import Route from 'react-router-dom/es/Route';
import { goBack } from 'react-router-redux/es/actions';
import PropTypes from 'prop-types';
import { MALE } from 'munchkin-core/es/constants/gender';

import { importContact, submitPlayer } from '../../actions';
import ScreenLoader from '../../containers/ScreenLoader';
import getRandomMaterialColor from '../../helpers/getRandomMaterialColor';

const getInitialValues = ({ app: { activePlayerId }, playerColors, players }) => {
  let initialValues = {
    gender: MALE,
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

const loader = () => import(/* webpackChunkName: "player-form", webpackMode: "lazy" */ './Screen');

const PlayerForm = ({ path, ...props }) => (
  <Route path={path}>
    {({ match }) => (
      <ScreenLoader
        in={Boolean(match)}
        loader={loader}
        {...props}
      />
    )}
  </Route>
);

PlayerForm.propTypes = {
  path: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerForm);
