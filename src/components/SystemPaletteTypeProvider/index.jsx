import { useMediaQuery } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';

const displayName = 'SystemPaletteTypeProvider';

const SystemPaletteTypeContext = createContext();

export const useSystemPaletteType = () => useContext(SystemPaletteTypeContext);

const SystemPaletteTypeProvider = ({ children }) => {
  const cssSupport = window.matchMedia('(prefers-color-scheme)').matches;

  const useCordova =
    'cordova' in window && window.cordova.platformId === 'android';

  const [ready, setReady] = useState(() => !useCordova);
  const [cordovaType, setCordovaType] = useState(null);

  useEffect(() => {
    if (!useCordova) {
      return;
    }

    const { ThemeDetection } = window.cordova.plugins;

    const onError = () => setReady(true);

    ThemeDetection.isAvailable(({ value: available }) => {
      if (available) {
        ThemeDetection.isDarkModeEnabled(({ value: darkMode }) => {
          setCordovaType(darkMode ? 'dark' : 'light');
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
    value = cordovaType;
  } else if (cssSupport) {
    value = dark ? 'dark' : 'light';
  }

  return (
    <SystemPaletteTypeContext.Provider value={value}>
      {children}
    </SystemPaletteTypeContext.Provider>
  );
};

SystemPaletteTypeProvider.propTypes = {
  children: PropTypes.node,
};

SystemPaletteTypeProvider.displayName = displayName;

export default SystemPaletteTypeProvider;
