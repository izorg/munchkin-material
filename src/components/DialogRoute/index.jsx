import React, { Suspense, useEffect } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Dialog, Fade, makeStyles, Slide } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { ios } from '../../utils/platforms';

import Loading from '../Loading';

const useStyles = makeStyles(
  {
    paper: {
      backgroundColor: 'transparent',
    },
  },
  { name: 'DialogRoute' },
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
      {({ match, ...rest }) => (
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
          <Suspense fallback={<Loading />}>
            <Component match={match} {...rest} />
          </Suspense>
        </Dialog>
      )}
    </Route>
  );
};

DialogRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};

DialogRoute.displayName = 'DialogRoute';

export default DialogRoute;
