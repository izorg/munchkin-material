import { useMediaQuery } from '@material-ui/core';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

const displayName = 'SystemPaletteModeProvider';

const SystemPaletteTypeContext = createContext();

export const useSystemPaletteMode = () => useContext(SystemPaletteTypeContext);

const SystemPaletteModeProvider = ({ children }) => {
  const cssSupport = window.matchMedia('(prefers-color-scheme)').matches;

  const useCordova =
    'cordova' in window && window.cordova.platformId === 'android';

  const [ready, setReady] = useState(() => !useCordova);
  const [cordovaMode, setCordovaMode] = useState();

  useEffect(() => {
    if (!useCordova) {
      return;
    }

    const { ThemeDetection } = window.cordova.plugins;

    const onError = () => setReady(true);

    ThemeDetection.isAvailable(({ value: available }) => {
      if (available) {
        ThemeDetection.isDarkModeEnabled(({ value: darkMode }) => {
          setCordovaMode(darkMode ? 'dark' : 'light');
          setReady(true);
        }, onError);
      } else {
        setReady(true);
      }
    }, onError);
  }, [useCordova]);

  const dark = useMediaQuery('(prefers-color-scheme: dark)', {
    noSsr: true,
  });

  if (!ready) {
    return null;
  }

  let value;

  if (useCordova) {
    value = cordovaMode;
  } else if (cssSupport) {
    value = dark ? 'dark' : 'light';
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
