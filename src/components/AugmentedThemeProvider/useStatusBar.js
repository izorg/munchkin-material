import { dark, light } from '@material-ui/core/styles/createPalette';
import { useEffect } from 'react';

import { useCordova } from '../CordovaProvider';

const useStatusBar = (theme) => {
  const cordova = useCordova();

  useEffect(() => {
    const { StatusBar } = window;

    if (!StatusBar || cordova?.platformId !== 'ios') {
      return;
    }

    const text =
      theme.components.MuiAppBar?.styleOverrides.colorPrimary.color ||
      theme.palette.primary.contrastText;

    if (theme.palette.mode === 'dark') {
      StatusBar.styleLightContent();
    } else {
      if (text === light.text.primary) {
        StatusBar.styleDefault();
      }

      if (text === dark.text.primary) {
        StatusBar.styleLightContent();
      }
    }
  }, [
    cordova?.platformId,
    theme.components.MuiAppBar?.styleOverrides.colorPrimary.color,
    theme.palette.mode,
    theme.palette.primary.contrastText,
  ]);
};

export default useStatusBar;
