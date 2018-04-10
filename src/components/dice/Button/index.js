import { connect } from 'react-redux';
import { push } from 'connected-react-router/lib/actions';

import { throwDice } from '../../../ducks/app';

import Component from './Component';

const mapDispatchToProps = (dispatch) => ({
  onClick: () => {
    dispatch(throwDice());
    dispatch(push({ search: '?dice' }));
  },
});

export default connect(undefined, mapDispatchToProps)(Component);
