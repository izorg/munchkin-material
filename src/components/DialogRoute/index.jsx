import {
  Dialog,
  Fade,
  makeStyles,
  Slide,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import { ios } from '../../utils/platforms';

const displayName = 'DialogRoute';

const useStyles = makeStyles(
  {
    paper: {
      backgroundColor: 'transparent',
    },
  },
  { name: displayName },
);

let appear = false;

const DialogRoute = ({ component: Component, path }) => {
  const classes = useStyles();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const TransitionComponent = matches && ios ? Slide : Fade;

  useEffect(() => {
    appear = true;
  }, []);

  return (
    <Route path={path}>
      {({ match }) => (
        <Dialog
          classes={classes}
          disableEscapeKeyDown
          disablePortal
          fullScreen
          hideBackdrop
          open={Boolean(match)}
          TransitionComponent={TransitionComponent}
          TransitionProps={{
            appear,
            direction: 'left',
          }}
        >
          <Component />
        </Dialog>
      )}
    </Route>
  );
};

DialogRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};

DialogRoute.displayName = displayName;

export default DialogRoute;
