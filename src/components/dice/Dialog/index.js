import { connect } from 'react-redux';
import { goBack } from 'connected-react-router/lib/actions';

import { throwDice } from '../../../ducks/app';
import getSearch from '../../../utils/getSearch';

import Component from './Component';

const mapStateToProps = (state) => ({
  dice: state.app.dice,
  open: getSearch(state).dice !== undefined,
});

const mapDispatchToProps = {
  onDiceClick: throwDice,
  onClose: goBack,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
