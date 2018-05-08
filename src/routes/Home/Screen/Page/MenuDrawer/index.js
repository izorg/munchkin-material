import { connect } from 'react-redux';
import { goBack, push } from 'connected-react-router/lib/actions';
import { isEmpty, isEqual } from 'lodash';

import getSearch from '../../../../../utils/getSearch';

import Component from './Component';

const mapStateToProps = (state) => {
  const search = getSearch(state);

  return {
    enable: isEmpty(search) || isEqual(search, { menu: '' }),
    open: search.menu !== undefined,
  };
};

const mapDispatchToProps = {
  onClose: goBack,
  onOpen: () => push({ search: '?menu' }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
