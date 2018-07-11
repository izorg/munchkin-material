import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { MuiThemeProvider } from '@material-ui/core/styles';

import createTheme from '../../styles/createTheme';
import themes from '../../styles/themes';

const theme = createSelector(
  (state) => state.app.theme,
  (key) => createTheme(themes[key]),
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
