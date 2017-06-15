import React, { Children } from 'react';
import Helmet from 'react-helmet';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import cns from 'classnames';

import munchkinTheme from '../../styles/munchkinTheme';

import cn from './style.css';

const animationClassNames = {
  'slide-horizontal': cn.slideHorizontal,
  'slide-vertical': cn.slideVertical,
  fade: cn.fade,
};

const App = props => (
  <MuiThemeProvider muiTheme={getMuiTheme(munchkinTheme)}>
    <div className={cn.app}>
      <Helmet>
        <html lang={navigator.language} />
      </Helmet>
      <CSSTransitionGroup
        className={cn.content}
        component="div"
        transitionEnterTimeout={0}
        transitionLeaveTimeout={0}
        transitionName={{
          enter: cn.itemEnter,
          enterActive: cn.itemEnterActive, // eslint-disable-line css-modules/no-undef-class
          leave: cn.itemLeave,
          leaveActive: cn.itemLeaveActive, // eslint-disable-line css-modules/no-undef-class
        }}
      >
        {
          Children.map(props.children, (child) => {
            const { animation = 'fade', path } = child.props.route;

            return (
              <div className={cns(cn.item, animationClassNames[animation])} key={path}>
                {child}
              </div>
            );
          })
        }
      </CSSTransitionGroup>
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: PropTypes.node,
};

App.defaultProps = {
  children: null,
};

export default App;
