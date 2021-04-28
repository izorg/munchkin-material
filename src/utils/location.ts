import { parse, ParsedQs, stringify } from "qs";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const parseSearch = (search: string): ParsedQs =>
  parse(search, {
    ignoreQueryPrefix: true,
    strictNullHandling: true,
  });

export const stringifyQuery = (query: Record<string, unknown>): string =>
  stringify(query, {
    addQueryPrefix: true,
    strictNullHandling: true,
  });

export const useGoBack = (): (() => void) => {
  const navigate = useNavigate();

  return useCallback(() => navigate(-1), [navigate]);
};

export const useLocationQuery = (): ParsedQs => {
  const { search } = useLocation();

  return parseSearch(search);
};
