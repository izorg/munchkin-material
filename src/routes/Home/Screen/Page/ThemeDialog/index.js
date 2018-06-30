import { connect } from 'react-redux';
import { goBack } from 'connected-react-router/lib/actions';

import { setTheme } from '../../../../../ducks/app';
import getSearch from '../../../../../utils/getSearch';

import Component from './Component';

const mapStateToProps = (state) => {
  const search = getSearch(state);

  return {
    open: search.theme !== undefined,
    value: state.app.theme,
  };
};

const mapDispatchToProps = {
  onClose: goBack,
  onSubmit: (theme) => async (dispatch) => {
    try {
      await dispatch(setTheme(theme));
      dispatch(goBack());
    } catch (error) {}
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
