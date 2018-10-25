import { createMuiTheme } from '@material-ui/core/styles';
import deepmerge from 'deepmerge';

import baseTheme from './baseTheme';

export default (selectedTheme, type) =>
  createMuiTheme(
    deepmerge.all([baseTheme(type), selectedTheme, { palette: { type } }]),
  );
