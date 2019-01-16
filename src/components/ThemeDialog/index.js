import { goBack, replace } from 'connected-react-router';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { flow, get } from 'lodash/fp';

import { setTheme } from '../../ducks/theme';
import { getQuery, stringifyQuery } from '../../utils/location';

import Component from './Component';

const themeSelector = createSelector(
  flow(
    getQuery,
    get('theme'),
  ),
  get('theme'),
  (previewTheme, theme) => ({
    ...theme,
    ...previewTheme,
  }),
);

const mapStateToProps = createStructuredSelector({
  open: flow(
    getQuery,
    ({ theme }) => theme !== undefined,
  ),
  theme: themeSelector,
});

const mapDispatchToProps = {
  onChange: (theme) => (dispatch, getState) =>
    dispatch(
      replace({
        search: stringifyQuery({
          ...getQuery(getState()),
          theme,
        }),
      }),
    ),
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
