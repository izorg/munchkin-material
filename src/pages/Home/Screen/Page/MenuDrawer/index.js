import { connect } from 'react-redux';
import { push } from 'connected-react-router/lib/actions';
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
  onClose: () => push('/'),
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
