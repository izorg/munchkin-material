import { createSelector } from 'reselect';
import { parse, stringify } from 'qs';
import { get } from 'lodash/fp';

export const getQuery = createSelector(
  get(['router', 'location', 'search']),
  (search) =>
    parse(search, {
      ignoreQueryPrefix: true,
    }),
);

export const stringifyQuery = (query) =>
  stringify(query, { strictNullHandling: true });
