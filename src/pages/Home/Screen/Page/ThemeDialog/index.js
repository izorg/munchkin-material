import { connect } from 'react-redux';
import { goBack } from 'connected-react-router/lib/actions';
import { parse } from 'qs';
import { noop } from 'lodash';

import { setTheme } from '../../../../../actions';

import Component from './Component';

const mapStateToProps = (state) => {
  const search = parse(state.router.location.search, {
    ignoreQueryPrefix: true,
  });

  return {
    open: search.theme !== undefined,
    value: state.app.theme,
  };
};

const mapDispatchToProps = {
  onClose: goBack,
  onSubmit: (theme) => (dispatch) => {
    dispatch(setTheme(theme))
      .then(() => dispatch(goBack()))
      .catch(noop);
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
