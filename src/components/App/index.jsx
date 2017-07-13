import React from 'react';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import { matchPath, Route } from 'react-router-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import routes from './routes';

import { ios } from '../../helpers/platforms';
import { classesShape } from '../../helpers/PropTypes';

const styles = {
  app: {
    backgroundColor: '#000000',
    height: '100%',
    position: 'relative',
  },

  content: {
    height: '100%',
  },

  item: {
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
};

const App = ({ classes }) => (
  <div className={classes.app}>
    <Helmet>
      <html lang={navigator.language} />
      {
        ios ? <body className="ios" /> : null
      }
    </Helmet>

    <Route
      render={({ location }) => (
        <TransitionGroup className={classes.content}>
          {
            routes.map(({ component: Component, transition: Transition, ...route }) => {
              const match = matchPath(location.pathname, route);

              if (match) {
                return (
                  <Transition key={route.path}>
                    <div className={classes.item}>
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

App.propTypes = {
  classes: classesShape.isRequired,
};

export default injectSheet(styles)(App);
