import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { MuiThemeProvider } from '@material-ui/core';

import createTheme from '../../styles/createTheme';
import themes from '../../styles/themes';

const theme = createSelector(
  (state) => state.theme.id,
  (state) => state.theme.type,
  (key, type) => createTheme(themes[key], type),
);

const mapStateToProps = createStructuredSelector({
  theme,
});

export default connect(
  mapStateToProps,
  undefined,
  (stateProps, dispatchProps, { children }) =>
    Object.assign({}, { children }, stateProps),
)(MuiThemeProvider);
