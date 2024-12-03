import { useEffect } from "react";

export const useHideSplashScreen = () => {
  useEffect(() => {
    navigator.splashscreen?.hide();
  }, []);
};
