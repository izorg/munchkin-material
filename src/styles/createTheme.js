import { createMuiTheme } from '@material-ui/core/styles';
import deepmerge from 'deepmerge';

import baseTheme from './baseTheme';

export default (selectedTheme) =>
  createMuiTheme(deepmerge(baseTheme, selectedTheme));
