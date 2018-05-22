import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { MuiThemeProvider } from '@material-ui/core/styles';

import createTheme from '../../styles/createTheme';
import themes from '../../styles/themes';

const theme = createSelector(
  (state) => state.app.theme,
  (state, ownProps) => ownProps.disableHover,
  (key, disableHover) => createTheme(themes[key], disableHover),
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
