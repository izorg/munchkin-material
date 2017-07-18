import React from 'react';
import Helmet from 'react-helmet';
import { matchPath, Route } from 'react-router-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import routes from './routes';

import { ios } from '../../helpers/platforms';

import cn from './style.css';

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
        <TransitionGroup className={cn.content}>
          {
            routes.map(({ component: Component, transition: Transition, ...route }) => {
              const match = matchPath(location.pathname, route);

              if (match) {
                return (
                  <Transition key={route.path}>
                    <div className={cn.item}>
                      <Component />
                    </div>
                  </Transition>
                );
              }

              return null;
            })
          }
        </TransitionGroup>
      )}
    />
  </div>
);

export default App;
