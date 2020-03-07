import { CssBaseline, makeStyles } from '@material-ui/core';
import React from 'react';

const displayName = 'GlobalCss';

const useStyles = makeStyles(
  {
    '@global': {
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
  { name: displayName },
);

const GlobalCss = () => {
  useStyles();

  return <CssBaseline />;
};

GlobalCss.displayName = displayName;

export default GlobalCss;
