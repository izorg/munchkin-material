import { useEffect } from "react";

const SplashScreenProvider = () => {
  useEffect(() => {
    navigator.splashscreen?.hide();
  }, []);

  return null;
};

export default SplashScreenProvider;
