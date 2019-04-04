import { push } from 'connected-react-router';
import { connect } from 'react-redux';

import { toggleMenu } from '../../../../ducks/app';
import { stringifyQuery } from '../../../../utils/location';

import Component from './Component';

const mapDispatchToProps = {
  onClick: (toggle) =>
    toggle ? toggleMenu() : push({ search: stringifyQuery({ menu: null }) }),
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Component);
