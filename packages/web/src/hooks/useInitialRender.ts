import { useEffect } from "react";

let initialRender = true;

export const useInitialRender = () => {
  useEffect(() => {
    initialRender = false;
  }, []);

  return initialRender;
};
