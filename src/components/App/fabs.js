import CombatButton from '../CombatButton';
import NewPlayerButton from '../../containers/NewPlayerButton';

export default [
  {
    button: NewPlayerButton,
    exact: true,
    path: '/',
  },
  {
    button: CombatButton,
    exact: true,
    path: '/player/:id',
  },
];

