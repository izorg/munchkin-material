import { parse, stringify } from 'qs';
import { useLocation } from 'react-router-dom';

export const useLocationQuery = () => {
  const { search } = useLocation();

  return parse(search, {
    ignoreQueryPrefix: true,
    strictNullHandling: true,
  });
};

export const stringifyQuery = (query) =>
  stringify(query, { strictNullHandling: true });
