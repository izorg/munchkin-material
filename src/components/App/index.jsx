import React from 'react';
import Helmet from 'react-helmet';
import { matchPath, Route } from 'react-router-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import { ios } from '../../helpers/platforms';

import fabs from './fabs';
import routes from './routes';

import Zoom from './transitions/Zoom';

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

              return match ? (
                <Transition key={`page-${route.path}`}>
                  <div className={cn.item}>
                    <Component />
                  </div>
                </Transition>
              ) : null;
            })
          }

          {
            fabs.some(route => matchPath(location.pathname, route)) ? (
              <Zoom>
                <div className={cn.fab}>
                  {
                    fabs.map(({ button: Button, ...route }) => {
                      const match = matchPath(location.pathname, route);

                      return match ? (
                        <Button key={`fab-${route.path}`} />
                      ) : null;
                    })
                  }
                </div>
              </Zoom>
            ) : null
          }
        </TransitionGroup>
      )}
    />
  </div>
);

export default App;
