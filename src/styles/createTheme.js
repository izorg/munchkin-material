import { createMuiTheme } from '@material-ui/core';
import deepmerge from 'deepmerge';

import baseTheme from './baseTheme';

export default (selectedTheme, type, direction) =>
  createMuiTheme(
    deepmerge.all([
      baseTheme({ direction, type }),
      selectedTheme,
      { palette: { type } },
    ]),
  );
