import Fade from './transitions/Fade';
import SlideHorizontal from './transitions/SlideHorizontal';
import SlideVertical from './transitions/SlideVertical';

import Combat from '../../containers/Combat';
import PlayerForm from '../../containers/Player/Form';
import PlayerList from '../../containers/Player/List';
import PlayerSlider from '../../containers/Player/Slider';

export default [
  {
    component: PlayerList,
    exact: true,
    path: '/',
    transition: Fade,
  },
  {
    component: PlayerForm,
    exact: true,
    path: '/player',
    transition: SlideVertical,
  },
  {
    component: PlayerSlider,
    exact: true,
    path: '/player/:id',
    transition: SlideHorizontal,
  },
  {
    component: PlayerForm,
    exact: true,
    path: '/player/:id/edit',
    transition: SlideVertical,
  },
  {
    component: Combat,
    exact: true,
    path: '/player/:id/combat',
    transition: SlideHorizontal,
  },
];

