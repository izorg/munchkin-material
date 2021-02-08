import { useMediaQuery } from "@material-ui/core";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const displayName = "SystemPaletteModeProvider";

const SystemPaletteTypeContext = createContext();

export const useSystemPaletteMode = () => useContext(SystemPaletteTypeContext);

const getAndroidSystemPaletteMode = () =>
  new Promise((resolve) => {
    const { ThemeDetection } = window.cordova.plugins;

    ThemeDetection.isAvailable(
      ({ value: available }) => {
        if (available) {
          ThemeDetection.isDarkModeEnabled(
            ({ value: darkMode }) => {
              resolve(darkMode ? "dark" : "light");
            },
            () => resolve()
          );
        } else {
          resolve();
        }
      },
      () => resolve()
    );
  });

const SystemPaletteModeProvider = ({ children }) => {
  const cssSupport = window.matchMedia("(prefers-color-scheme)").matches;

  const useCordova =
    "cordova" in window && window.cordova.platformId === "android";

  const [ready, setReady] = useState(() => !useCordova);
  const [cordovaMode, setCordovaMode] = useState();

  useEffect(() => {
    if (!useCordova) {
      return;
    }

    getAndroidSystemPaletteMode()
      .then(setCordovaMode)
      .finally(() => setReady(true));

    const onResume = () => {
      getAndroidSystemPaletteMode().then(setCordovaMode);
    };

    document.addEventListener("resume", onResume);

    return () => document.removeEventListener("resume", onResume);
  }, [useCordova]);

  const dark = useMediaQuery("(prefers-color-scheme: dark)");

  if (!ready) {
    return null;
  }

  let value;

  if (useCordova) {
    value = cordovaMode;
  } else if (cssSupport) {
    value = dark ? "dark" : "light";
  }

  return (
    <SystemPaletteTypeContext.Provider value={value}>
      {children}
    </SystemPaletteTypeContext.Provider>
  );
};

SystemPaletteModeProvider.propTypes = {
  children: PropTypes.node,
};

SystemPaletteModeProvider.displayName = displayName;

export default SystemPaletteModeProvider;
