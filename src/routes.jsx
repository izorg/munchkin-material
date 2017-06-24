// import React from 'react';
// import { IndexRoute, Route } from 'react-router-dom';

// import App from './containers/App';
import PlayerForm from './containers/Player/Form';
import PlayerList from './containers/Player/List';
import PlayerSlider from './containers/Player/Slider';

// export default (
//   <Route path="/" component={App}>
//     <IndexRoute component={PlayerList} animation="fade" />
//     <Route path="player" component={PlayerForm} animation="slide-vertical" />
//     <Route path="player/:id" component={PlayerSlider} animation="slide-horizontal" />
//     <Route path="player/:id/edit" component={PlayerForm} animation="slide-vertical" />
//   </Route>
// );

export default [
  {
    animation: 'fade',
    component: PlayerList,
    exact: true,
    path: '/',
  },
  {
    animation: 'slide-vertical',
    component: PlayerForm,
    exact: true,
    path: '/player',
  },
  {
    animation: 'slide-horizontal',
    component: PlayerSlider,
    exact: true,
    path: '/player/:id',
  },
  {
    animation: 'slide-vertical',
    component: PlayerForm,
    exact: true,
    path: '/player/:id/edit',
  },
];

