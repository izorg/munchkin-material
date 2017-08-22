import { matchPath } from 'react-router-dom';

import fade from './transitions/Fade/style.css';
import slideHorizontal from './transitions/SlideHorizontal/style.css';
import slideVertical from './transitions/SlideVertical/style.css';

const pages = {
  home: {
    route: {
      exact: true,
      path: '/',
    },
    transition: {
      classNames: {
        enter: fade.itemEnter,
        enterActive: fade.itemEnterActive,
        exit: fade.itemLeave,
        exitActive: fade.itemLeaveActive,
      },
      timeout: 400,
    },
  },
  form: {
    route: {
      exact: true,
      path: '/player',
    },
    transition: {
      classNames: {
        enter: slideVertical.itemEnter,
        enterActive: slideVertical.itemEnterActive,
        exit: slideVertical.itemLeave,
        exitActive: slideVertical.itemLeaveActive,
      },
      timeout: 400,
    },
  },
  slider: {
    route: {
      exact: true,
      path: '/player/:id',
    },
    transition: {
      classNames: {
        enter: slideHorizontal.itemEnter,
        enterActive: slideHorizontal.itemEnterActive,
        exit: slideHorizontal.itemLeave,
        exitActive: slideHorizontal.itemLeaveActive,
      },
      timeout: 400,
    },
  },
  editForm: {
    route: {
      exact: true,
      path: '/player/:id/edit',
    },
    transition: {
      classNames: {
        enter: slideVertical.itemEnter,
        enterActive: slideVertical.itemEnterActive,
        exit: slideVertical.itemLeave,
        exitActive: slideVertical.itemLeaveActive,
      },
      timeout: 400,
    },
  },
  combat: {
    route: {
      path: '/player/:id/combat',
    },
    transition: {
      classNames: {
        enter: slideHorizontal.itemEnter,
        enterActive: slideHorizontal.itemEnterActive,
        exit: slideHorizontal.itemLeave,
        exitActive: slideHorizontal.itemLeaveActive,
      },
      timeout: 400,
    },
  },
};

export const getKey = pathname => (Object.keys(pages).find(key => matchPath(pathname, pages[key].route)) || 'home');

export const getTransition = pathname => pages[getKey(pathname)].transition;

export default pages;
