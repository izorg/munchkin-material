import { connect } from 'react-redux';
import { goBack, push } from 'connected-react-router/lib/actions';
import { parse } from 'qs';

import Component from './Component';

const mapStateToProps = (state) => {
  const search = parse(state.router.location.search, {
    ignoreQueryPrefix: true,
  });

  return {
    open: search.menu !== undefined,
  };
};

const mapDispatchToProps = {
  onClose: goBack,
  onOpen: () => push({ search: '?menu' }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
