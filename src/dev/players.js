import { cyan, green, orange, yellow } from "@material-ui/core/colors";

import { CS, EN, HE, RU, UK } from "../i18n";
import createPlayer from "../utils/createPlayer";
import { FEMALE } from "../utils/sex";

export default {
  [CS]: [
    {
      player: createPlayer({
        color: yellow[500],
        gear: 9,
        level: 5,
        name: "Vladimír",
      }),
    },
    {
      player: createPlayer({
        color: green[500],
        gear: 10,
        level: 6,
        name: "Otakar",
      }),
    },
    {
      player: createPlayer({
        color: cyan[500],
        gear: 6,
        level: 2,
        name: "Zdeněk",
      }),
    },
    {
      player: createPlayer({
        color: orange[500],
        gear: 8,
        level: 4,
        name: "Zuzana",
        sex: FEMALE,
      }),
    },
  ],

  [EN]: [
    {
      player: createPlayer({
        color: "#607D8B",
        gear: 13,
        level: 3,
        name: "Barack Obama",
      }),
    },
    {
      player: createPlayer({
        color: "#FFC107",
        gear: 20,
        level: 5,
        name: "Donald Trump",
      }),
    },
    {
      player: createPlayer({
        color: "#03A9F4",
        gear: 10,
        level: 7,
        name: "Hillary Clinton",
        sex: FEMALE,
      }),
    },
  ],

  [HE]: [
    {
      player: createPlayer({
        color: "#607D8B",
        gear: 13,
        level: 3,
        name: "‏בנימין נתניהו‏‎",
      }),
    },
    {
      player: createPlayer({
        color: "#FFC107",
        gear: 20,
        level: 5,
        name: "אהוד אולמרט‏‎",
      }),
    },
    {
      player: createPlayer({
        color: "#03A9F4",
        gear: 10,
        level: 7,
        name: "אריאל שרון‏",
      }),
    },
  ],

  [RU]: [
    {
      player: createPlayer({
        color: "#F44336",
        gear: 30,
        level: 3,
        name: "Илья Муромец",
      }),
    },
    {
      player: createPlayer({
        color: "#009688",
        gear: 13,
        level: 6,
        name: "Соловей Разбойник",
      }),
    },
    {
      player: createPlayer({
        color: "#E91E63",
        gear: 7,
        level: 8,
        name: "Василиса Премудрая",
        sex: FEMALE,
      }),
    },
  ],

  [UK]: [
    {
      player: createPlayer({
        color: green[500],
        gear: 10,
        level: 6,
        name: "Зеленський",
      }),
    },
    {
      player: createPlayer({
        color: yellow[500],
        gear: 9,
        level: 5,
        name: "Порошенко",
      }),
    },
    {
      player: createPlayer({
        color: orange[500],
        gear: 8,
        level: 4,
        name: "Янукович",
      }),
    },
    {
      player: createPlayer({
        color: cyan[500],
        gear: 6,
        level: 2,
        name: "Кучма",
      }),
    },
  ],
};
