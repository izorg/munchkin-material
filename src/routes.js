import PlayerForm from './containers/Player/Form';
import PlayerList from './containers/Player/List';
import PlayerSlider from './containers/Player/Slider';

import PageFade from './components/transitions/PageFade';
import PageSlideHorizontal from './components/transitions/PageSlideHorizontal';
import PageSlideVertical from './components/transitions/PageSlideVertical';

export default [
  {
    animation: 'fade',
    component: PlayerList,
    exact: true,
    path: '/',
    transition: PageFade,
  },
  {
    animation: 'slide-vertical',
    component: PlayerForm,
    exact: true,
    path: '/player',
    transition: PageSlideVertical,
  },
  {
    animation: 'slide-horizontal',
    component: PlayerSlider,
    exact: true,
    path: '/player/:id',
    transition: PageSlideHorizontal,
  },
  {
    animation: 'slide-vertical',
    component: PlayerForm,
    exact: true,
    path: '/player/:id/edit',
    transition: PageSlideVertical,
  },
];

