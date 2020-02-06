import { parse, stringify } from 'qs';
import { createSelector } from 'reselect';

export const getQuery = createSelector(
  (state) => state.router.location.search,
  (search) =>
    parse(search, {
      ignoreQueryPrefix: true,
      strictNullHandling: true,
    }),
);

export const stringifyQuery = (query) =>
  stringify(query, { strictNullHandling: true });
