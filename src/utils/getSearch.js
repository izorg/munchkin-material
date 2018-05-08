import { createSelector } from 'reselect';
import { parse } from 'qs';

export default createSelector(
  (state) => state.router.location.search,
  (search) =>
    parse(search, {
      ignoreQueryPrefix: true,
    }),
);
