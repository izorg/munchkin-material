import { CS, EN, HE, RU, UK } from "../i18n";
import createPlayer from "../utils/createPlayer";
import { Sex } from "../utils/types";

const players = {
  [CS]: [
    {
      player: createPlayer({
        color: "yellow",
        gear: 9,
        level: 5,
        name: "Vladimír",
      }),
    },
    {
      player: createPlayer({
        color: "green",
        gear: 10,
        level: 6,
        name: "Otakar",
      }),
    },
    {
      player: createPlayer({
        color: "cyan",
        gear: 6,
        level: 2,
        name: "Zdeněk",
      }),
    },
    {
      player: createPlayer({
        color: "orange",
        gear: 8,
        level: 4,
        name: "Zuzana",
        sex: Sex.Female,
      }),
    },
  ],

  [EN]: [
    {
      player: createPlayer({
        color: "blueGrey",
        gear: 13,
        level: 3,
        name: "Barack Obama",
      }),
    },
    {
      player: createPlayer({
        color: "amber",
        gear: 20,
        level: 5,
        name: "Donald Trump",
      }),
    },
    {
      player: createPlayer({
        color: "blue",
        gear: 10,
        level: 7,
        name: "Hillary Clinton",
        sex: Sex.Female,
      }),
    },
  ],

  [HE]: [
    {
      player: createPlayer({
        color: "blueGrey",
        gear: 13,
        level: 3,
        name: "‏בנימין נתניהו‏‎",
      }),
    },
    {
      player: createPlayer({
        color: "amber",
        gear: 20,
        level: 5,
        name: "אהוד אולמרט‏‎",
      }),
    },
    {
      player: createPlayer({
        color: "blue",
        gear: 10,
        level: 7,
        name: "אריאל שרון‏",
      }),
    },
  ],

  [RU]: [
    {
      player: createPlayer({
        color: "red",
        gear: 30,
        level: 3,
        name: "Илья Муромец",
      }),
    },
    {
      player: createPlayer({
        color: "teal",
        gear: 13,
        level: 6,
        name: "Соловей Разбойник",
      }),
    },
    {
      player: createPlayer({
        color: "pink",
        gear: 7,
        level: 8,
        name: "Василиса Премудрая",
        sex: Sex.Female,
      }),
    },
  ],

  [UK]: [
    {
      player: createPlayer({
        color: "green",
        gear: 10,
        level: 6,
        name: "Зеленський",
      }),
    },
    {
      player: createPlayer({
        color: "yellow",
        gear: 9,
        level: 5,
        name: "Порошенко",
      }),
    },
    {
      player: createPlayer({
        color: "orange",
        gear: 8,
        level: 4,
        name: "Янукович",
      }),
    },
    {
      player: createPlayer({
        color: "cyan",
        gear: 6,
        level: 2,
        name: "Кучма",
      }),
    },
  ],
};

export default players;
