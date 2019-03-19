import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { flow, get } from 'lodash/fp';

import createTheme from '../../styles/createTheme';
import themes from '../../styles/themes';
import { getQuery } from '../../utils/location';

import Component from './Component';

const themeSelector = createSelector(
  flow(
    getQuery,
    get('theme'),
  ),
  get('theme'),
  (previewTheme, currentTheme) => {
    const theme = {
      ...currentTheme,
      ...previewTheme,
    };

    return createTheme(themes[theme.id], theme.type);
  },
);

const mapStateToProps = createStructuredSelector({
  theme: themeSelector,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
