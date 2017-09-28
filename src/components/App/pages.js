import Combat from '../../containers/Combat';
import PlayerForm from '../../containers/Player/Form';
import PlayerList from '../../containers/Player/List';
import PlayerSlider from '../../containers/Player/Slider';

const pages = {
  home: {
    component: PlayerList,
    route: {
      exact: true,
      path: '/',
    },
  },

  form: {
    component: PlayerForm,
    route: {
      exact: true,
      path: '/player',
    },
  },

  slider: {
    component: PlayerSlider,
    route: {
      exact: true,
      path: '/player/:id',
    },
  },

  edit: {
    component: PlayerForm,
    route: {
      exact: true,
      path: '/player/:id/edit',
    },
  },

  combat: {
    component: Combat,
    route: {
      path: '/player/:id/combat',
    },
  },
};

export default pages;
