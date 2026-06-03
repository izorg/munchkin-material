import { createContext } from "react";

export type LocaleContextValue = {
  openLocaleSettings?: () => void;
};

export const LocaleContext = createContext<LocaleContextValue | undefined>(
  undefined,
);
