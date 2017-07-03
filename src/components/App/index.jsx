import React from 'react';
import Helmet from 'react-helmet';
import { matchPath, Route } from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import cns from 'classnames';

import { ios } from '../../helpers/platforms';
import routes from '../../routes';

import cn from './style.css';

const animationClassNames = {
  'slide-horizontal': cn.slideHorizontal,
  'slide-vertical': cn.slideVertical,
  fade: cn.fade,
};

const App = () => (
  <div className={cn.app}>
    <Helmet>
      <html lang={navigator.language} />
      {
        ios ? <body className="ios" /> : null
      }
    </Helmet>

    <Route
      render={({ location }) => (
        <CSSTransitionGroup
          className={cn.content}
          component="div"
          transitionEnterTimeout={0}
          transitionLeaveTimeout={0}
          transitionName={{
            enter: cn.itemEnter,
            enterActive: cn.itemEnterActive,
            leave: cn.itemLeave,
            leaveActive: cn.itemLeaveActive,
          }}
        >
          {
            routes.map(({ component, animation, ...route }) => {
              const match = matchPath(location.pathname, route);

              if (match) {
                return (
                  <div className={cns(cn.item, animationClassNames[animation])} key={route.path}>
                    {React.createElement(component)}
                  </div>
                );
              }

              return null;
            })
          }
        </CSSTransitionGroup>
      )}
    />
  </div>
);

export default App;
