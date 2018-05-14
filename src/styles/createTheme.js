import { createMuiTheme } from '@material-ui/core/styles';
import deepmerge from 'deepmerge';

import baseTheme from './baseTheme';

export default (theme) => createMuiTheme(deepmerge(baseTheme, theme));
