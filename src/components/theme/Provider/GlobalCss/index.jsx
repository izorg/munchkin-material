import React from 'react';
import { CssBaseline, makeStyles } from '@material-ui/core';

import munchkinWoff from '../../../../fonts/munchkin.woff';
import munchkinWoff2 from '../../../../fonts/munchkin.woff2';

const useStyles = makeStyles(
  {
    '@global': {
      '@font-face': {
        fontFamily: 'Munchkin',
        fontStyle: 'normal',
        fontWeight: 'normal',
        src: `url(${munchkinWoff2}) format('woff2'), url(${munchkinWoff}) format('woff')`,
      },

      html: {
        height: '100%',
        overflow: 'hidden',
        textSizeAdjust: '100%',
      },

      body: {
        height: '100%',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitTouchCallout: 'none', // iOS Safari
        width: '100%',
      },

      '#app': {
        height: '100%',
        position: 'relative',
      },
    },
  },
  { name: 'GlobalCss' },
);

const GlobalCss = () => {
  useStyles();

  return <CssBaseline />;
};

export default GlobalCss;
