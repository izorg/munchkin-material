import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';

import { throwDice } from '../../../ducks/app';
import { getQuery } from '../../../utils/location';

import Component from './Component';

const mapStateToProps = (state) => ({
  dice: state.app.dice,
  open: getQuery(state).dice !== undefined,
});

const mapDispatchToProps = {
  onDiceClick: throwDice,
  onClose: goBack,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
