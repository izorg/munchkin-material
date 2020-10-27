import { darken, rgbToHex } from '@material-ui/core';
import { dark, light } from '@material-ui/core/styles/createPalette';
import { useEffect } from 'react';

import { useCordova } from '../CordovaProvider';

const useStatusBar = (theme) => {
  const cordova = useCordova();

  useEffect(() => {
    const { StatusBar } = window;

    if (!StatusBar) {
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

    if (cordova?.platformId === 'android') {
      let background =
        theme.components.MuiAppBar?.styleOverrides.colorPrimary
          .backgroundColor || theme.palette.primary.main;

      if (theme.palette.mode === 'dark') {
        background = theme.palette.grey[900];
      }

      StatusBar.backgroundColorByHexString(rgbToHex(darken(background, 0.5)));
    }
  }, [
    cordova?.platformId,
    theme.components.MuiAppBar?.styleOverrides.colorPrimary.backgroundColor,
    theme.components.MuiAppBar?.styleOverrides.colorPrimary.color,
    theme.palette.grey,
    theme.palette.mode,
    theme.palette.primary.contrastText,
    theme.palette.primary.main,
  ]);
};

export default useStatusBar;
