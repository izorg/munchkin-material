import { push } from 'connected-react-router';
import { connect } from 'react-redux';

import { throwDice } from '../../../ducks/app';
import { stringifyQuery } from '../../../utils/location';

import Component from './Component';

const mapDispatchToProps = {
  onClick: () => (dispatch) => {
    dispatch(throwDice());
    dispatch(push({ search: stringifyQuery({ dice: null }) }));
  },
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Component);
