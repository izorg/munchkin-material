import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';

import { setTheme } from '../../../../../ducks/theme';
import { getQuery } from '../../../../../utils/location';

import Component from './Component';

const mapStateToProps = (state) => {
  const search = getQuery(state);

  return {
    open: search.theme !== undefined,
    value: state.theme.id,
  };
};

const mapDispatchToProps = {
  onClose: goBack,
  onSubmit: (id) => async (dispatch) => {
    try {
      await dispatch(setTheme({ id }));
      dispatch(goBack());
    } catch (error) {}
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
