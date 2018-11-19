import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flow, get } from 'lodash/fp';

import { setTheme } from '../../ducks/theme';
import { getQuery } from '../../utils/location';

import Component from './Component';

const mapStateToProps = createStructuredSelector({
  open: flow(
    getQuery,
    ({ theme }) => theme !== undefined,
  ),
  theme: get('theme'),
});

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
