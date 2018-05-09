import { connect } from 'react-redux';
import { goBack, push } from 'connected-react-router/lib/actions';

import getSearch from '../../../../../utils/getSearch';

import Component from './Component';

const mapStateToprops = (state) => ({
  open: getSearch(state).color !== undefined,
});

const mapDispatchToProps = {
  onOpen: () => push({ search: '?color' }),
  onClose: goBack,
};

export default connect(mapStateToprops, mapDispatchToProps)(Component);
