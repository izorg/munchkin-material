import connect from 'react-redux/es/connect/connect';
import { MALE } from 'munchkin-core/es/constants/gender';

import { importContact, submitPlayer } from '../../../../actions';
import getRandomMaterialColor from '../../../../helpers/getRandomMaterialColor';

import Component from './Component';

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
});

const mapDispatchToProps = {
  onImport: importContact,
  onSubmit: submitPlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
