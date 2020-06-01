import { parse, stringify } from 'qs';
import { useLocation } from 'react-router-dom';

export const parseSearch = (search) =>
  parse(search, {
    ignoreQueryPrefix: true,
    strictNullHandling: true,
  });

export const useLocationQuery = () => {
  const { search } = useLocation();

  return parseSearch(search);
};

export const stringifyQuery = (query) =>
  stringify(query, { strictNullHandling: true });
