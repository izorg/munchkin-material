import { createSelector } from 'reselect';
import { get } from 'lodash/fp';
import { parse, stringify } from 'qs';

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
