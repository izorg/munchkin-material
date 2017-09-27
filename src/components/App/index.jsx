import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { matchPath, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import munchkinWoff from '../../fonts/munchkin.woff';
import munchkinWoff2 from '../../fonts/munchkin.woff2';

import { noop } from '../../constants';
import CombatButton from '../../containers/Combat/Button';
import CombatHelperButton from '../../containers/Combat/HelperButton';
import NewPlayerButton from '../../containers/NewPlayerButton';
import { classesObject } from '../../utils/propTypes';

import pages from './pages';

const ANIMATION_DURATION = 400;

const styles = {
  '@global': {
    '@font-face': {
      fontFamily: 'Munchkin',
      src: `
        url(${munchkinWoff2}) format('woff2'),
        url(${munchkinWoff}) format('woff')`,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },

    '*': {
      '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)', /* make transparent link selection, adjust last value opacity 0 to 1.0 */
    },

    html: {
      height: '100%',
      lineHeight: 1.15,
      '-ms-text-size-adjust': '100%',
      '-webkit-text-size-adjust': '100%',
    },

    body: {
      height: '100%',
      margin: 0,
      overflow: 'hidden',
      width: '100%',
      '-webkit-touch-callout': 'none', /* iOS Safari */
      userSelect: 'none', /* Non-prefixed version, currently supported by Chrome and Opera */
    },

    '#app': {
      height: '100%',
    },
  },

  app: {
    backgroundColor: '#000000',
    height: '100%',
    position: 'relative',
  },

  item: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    left: 0,
    position: 'absolute',
    width: '100%',
    top: 0,
  },


  enter: {
    zIndex: 1,
  },

  exit: {
    zIndex: 0,
  },


  fadeInUp: {
    opacity: 0,
    transform: 'translateY(100%)',
  },

  fadeInUpActive: {
    opacity: 1,
    transform: 'translateY(0)',
    transition: `
      opacity ${ANIMATION_DURATION}ms ease-out,
      transform ${ANIMATION_DURATION}ms ease-out`,
  },


  fadeOutDown: {
    opacity: 1,
    transform: 'translateY(0)',
  },

  fadeOutDownActive: {
    opacity: 0,
    transform: 'translateY(100%)',
    transition: `
      opacity ${ANIMATION_DURATION}ms ease-in,
      transform ${ANIMATION_DURATION}ms ease-in`,
  },


  slideInRight: {
    transform: 'translateX(100%)',
  },

  slideInRightActive: {
    transform: 'translateX(0)',
    transition: `transform ${ANIMATION_DURATION}ms ease-out`,
  },


  slideOutRight: {
    transform: 'translateX(0)',
  },

  slideOutRightActive: {
    transform: 'translateX(100%)',
    transition: `transform ${ANIMATION_DURATION}ms ease-in`,
  },


  zoomIn: {
    transform: 'scale(0.8)',
  },

  zoomInActive: {
    transform: 'scale(1)',
    transition: `transform ${ANIMATION_DURATION}ms ease-out`,
  },


  zoomOut: {
    opacity: 1,
    transform: 'scale(1)',
  },

  zoomOutActive: {
    opacity: 0.8, // IE/Edge blink fix
    transform: 'scale(0.8)',
    transition: `
      opacity ${ANIMATION_DURATION}ms ease-in,
      transform ${ANIMATION_DURATION}ms ease-in`,
  },


  fab: {
    bottom: 24,
    position: 'absolute',
    right: 24,
    zIndex: 3,
  },
};

class App extends Component {
  getChildContext() {
    const { buyFullVersion } = this.props;

    return { buyFullVersion };
  }

  componentWillUpdate() {
    this.prevPathname = this.props.location.pathname;
  }

  getTransitionClassNames(key) {
    const { classes, location } = this.props;

    switch (key) {
      case 'combat':
        return {
          enter: classes.slideInRight,
          enterActive: classes.slideInRightActive,
          exit: classes.slideOutRight,
          exitActive: classes.slideOutRightActive,
        };

      case 'edit':
      case 'form':
        return {
          enter: classes.fadeInUp,
          enterActive: classes.fadeInUpActive,
          exit: classes.fadeOutDown,
          exitActive: classes.fadeOutDownActive,
        };

      case 'home':
        return {
          enter: classes.zoomIn,
          enterActive: classes.zoomInActive,
          exit: classes.zoomOut,
          exitActive: classes.zoomOutActive,
        };

      case 'slider': {
        const classNames = {
          enter: classes.slideInRight,
          enterActive: classes.slideInRightActive,
          exit: classes.slideOutRight,
          exitActive: classes.slideOutRightActive,
        };

        if (matchPath(this.prevPathname, pages.combat.route)) {
          return {
            ...classNames,
            enter: classes.zoomIn,
            enterActive: classes.zoomInActive,
          };
        }

        if (matchPath(location.pathname, pages.combat.route)) {
          return {
            ...classNames,
            exit: classes.zoomOut,
            exitActive: classes.zoomOutActive,
          };
        }

        return classNames;
      }

      default:
        return {
          enter: classes.enter,
          enterActive: classes.enter,
          exit: classes.exit,
          exitActive: classes.exit,
        };
    }
  }

  render() {
    const { classes, location } = this.props;

    if (!Object.keys(pages).some(key => matchPath(location.pathname, pages[key].route))) {
      return <Redirect to="/" />;
    }

    return (
      <div className={classes.app}>
        <Helmet>
          <html lang={navigator.language} />
        </Helmet>

        {Object.keys(pages).map((key) => {
          const { component: PageComponent, route } = pages[key];

          return (
            <Route key={key} {...route}>
              {({ match }) => (
                <CSSTransition
                  classNames={this.getTransitionClassNames(key)}
                  in={Boolean(match)}
                  mountOnEnter
                  timeout={ANIMATION_DURATION}
                  unmountOnExit
                >
                  <div className={classes.item}>
                    <PageComponent />
                  </div>
                </CSSTransition>
              )}
            </Route>
          );
        })}

        <div className={classes.fab}>
          <Switch>
            <Route component={NewPlayerButton} exact path="/" />
            <Route component={CombatButton} exact path="/player/:id" />
            <Route component={CombatHelperButton} path="/player/:id/combat" />
          </Switch>
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
  buyFullVersion: PropTypes.func,
};

App.propTypes = {
  buyFullVersion: PropTypes.func,
  classes: classesObject.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

App.defaultProps = {
  buyFullVersion: noop,
};

export default withRouter(withStyles(styles)(App));
