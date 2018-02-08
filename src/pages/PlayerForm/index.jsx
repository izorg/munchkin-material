import React, { Fragment } from 'react';
import Route from 'react-router-dom/Route';

import ScreenLoader from '../../components/ScreenLoader';

const loader = () => import(/* webpackChunkName: "player-form" */ './Screen');

// eslint-disable-next-line react/prop-types
const children = ({ match }) => <ScreenLoader loader={loader} match={match} />;

const PlayerForm = () => (
  <Fragment>
    <Route path="/new">{children}</Route>
    <Route path="/edit/:id">{children}</Route>
  </Fragment>
);

export default PlayerForm;
