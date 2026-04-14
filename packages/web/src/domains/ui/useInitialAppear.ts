import { useEffect } from "react";

let initialAppear = true;

export const useInitialAppear = (appearProp?: boolean) => {
  useEffect(() => {
    if (!initialAppear) {
      return;
    }

    const request = globalThis.requestAnimationFrame(() => {
      initialAppear = false;
    });

    return () => {
      globalThis.cancelAnimationFrame(request);
    };
  }, []);

  return initialAppear ? false : appearProp;
};
