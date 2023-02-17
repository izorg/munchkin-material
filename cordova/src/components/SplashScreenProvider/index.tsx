import { useEffect } from "react";

const SplashScreenProvider = () => {
  useEffect(() => {
    setTimeout(() => {
      navigator.splashscreen?.hide();
    }, 10);
  }, []);

  return null;
};

export default SplashScreenProvider;
