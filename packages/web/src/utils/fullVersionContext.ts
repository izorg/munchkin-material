import { createContext, useContext } from "react";

type FullVersionContextValue = {
  /**
   * If the store is not ready, the function is not provided
   */
  buyFullVersion?: () => Promise<void>;

  fullVersion: boolean;

  restorePurchases?: () => void;
};

/**
 * This error means the full version buying is failed and handled
 * by the implemented functions {@link buyFullVersion} & {@link restorePurchases}.
 * In this case the error contains a human-readable message.
 */
export class FullVersionError extends Error {
  public constructor(message: string, options: ErrorOptions) {
    super(message, options);

    this.name = "FullVersionError";
  }
}

export const FullVersionContext = createContext<FullVersionContextValue>({
  fullVersion: true,
});

export const useFullVersion = (): FullVersionContextValue =>
  useContext(FullVersionContext);
