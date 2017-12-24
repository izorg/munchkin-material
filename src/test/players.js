import createPlayer from 'munchkin-core/es/utils/createPlayer';
import { FEMALE } from 'munchkin-core/es/utils/gender';

export default {
  en: [
    {
      color: '#607D8B',
      player: createPlayer({
        gear: 13,
        level: 3,
        name: 'Barack Obama',
      }),
    },
    {
      color: '#FFC107',
      player: createPlayer({
        gear: 20,
        level: 5,
        name: 'Donald Trump',
      }),
    },
    {
      color: '#03A9F4',
      player: createPlayer({
        gear: 10,
        gender: FEMALE,
        level: 7,
        name: 'Hillary Clinton',
      }),
    },
  ],

  ru: [
    {
      color: '#F44336',
      player: createPlayer({
        gear: 30,
        level: 3,
        name: 'Илья Муромец',
      }),
    },
    {
      color: '#009688',
      player: createPlayer({
        gear: 13,
        level: 6,
        name: 'Соловей Разбойник',
      }),
    },
    {
      color: '#E91E63',
      player: createPlayer({
        gear: 7,
        gender: FEMALE,
        level: 8,
        name: 'Василиса Премудрая',
      }),
    },
  ],
};
