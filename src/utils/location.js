import { parse, stringify } from "qs";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const parseSearch = (search) =>
  parse(search, {
    ignoreQueryPrefix: true,
    strictNullHandling: true,
  });

export const stringifyQuery = (query) =>
  stringify(query, {
    addQueryPrefix: true,
    strictNullHandling: true,
  });

export const useGoBack = () => {
  const navigate = useNavigate();

  return useCallback(() => navigate(-1), [navigate]);
};

export const useLocationQuery = () => {
  const { search } = useLocation();

  return parseSearch(search);
};
