import { push } from 'connected-react-router';
import { createSelector } from 'reselect';
import { parse, stringify } from 'qs';
import { get } from 'lodash/fp';

export const getQuery = createSelector(
  get(['router', 'location', 'search']),
  (search) =>
    parse(search, {
      ignoreQueryPrefix: true,
      strictNullHandling: true,
    }),
);

export const stringifyQuery = (query) =>
  stringify(query, { strictNullHandling: true });

export const addQuery = (query) => (dispatch, getState) =>
  dispatch(
    push({
      search: stringifyQuery({
        ...getQuery(getState()),
        ...query,
      }),
    }),
  );
