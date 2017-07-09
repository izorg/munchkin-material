import PlayerForm from './containers/Player/Form';
import PlayerList from './containers/Player/List';
import PlayerSlider from './containers/Player/Slider';

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

