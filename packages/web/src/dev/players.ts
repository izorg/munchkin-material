import {
  type AvailableLocale,
  CS,
  DA,
  DE,
  EL,
  EN,
  ES,
  FI,
  FR,
  HE,
  HU,
  HY,
  IT,
  NB,
  NL,
  PL,
  PT,
  PT_BR,
  RU,
  SK,
  TR,
  UK,
} from "../i18n";
import createPlayer from "../utils/createPlayer";
import { Sex } from "../utils/types";

const templatePlayers = [
  createPlayer({
    color: "purple",
    gear: 9,
    level: 5,
    sex: Sex.Male,
  }),
  createPlayer({
    color: "green",
    gear: 10,
    level: 6,
    sex: Sex.Male,
  }),
  createPlayer({
    color: "cyan",
    gear: 6,
    level: 2,
    sex: Sex.Female,
  }),
  createPlayer({
    color: "orange",
    gear: 8,
    level: 4,
    sex: Sex.Female,
  }),
];

const getLocalizedPlayers = (names: string[]) =>
  templatePlayers.map((templatePlayer, index) => ({
    ...templatePlayer,
    name: names[index],
  }));

const nameEntries: [locale: AvailableLocale, names: string[]][] = [
  [CS, ["Jan", "Jakub", "Tereza", "Anna"]],
  [DA, ["William", "Noah", "Emma", "Freja"]],
  [DE, ["Max", "Paul", "Emma", "Hannah"]],
  [EL, ["Γιώργος", "Αντώνης", "Μαρία", "Σοφία"]],
  [EN, ["Liam", "Noah", "Olivia", "Emma"]],
  [ES, ["Alejandro", "Daniel", "Lucia", "Martina"]],
  [FI, ["Onni", "Elias", "Aino", "Eevi"]],
  [FR, ["Gabriel", "Raphaël", "Emma", "Louise"]],
  [HE, ["נוֹעַם", "אִיתַי", "מַיָּה", "תָּמָר"]],
  [HU, ["Bence", "Máté", "Hanna", "Luca"]],
  [HY, ["Արմեն", "Մարտիրոս", "Անահիտ", "Նարինե"]],
  [IT, ["Leo", "Francesco", "Sofia", "Giulia"]],
  [NB, ["Jakob", "Lucas", "Emma", "Nora"]],
  [NL, ["Sem", "Lucas", "Emma", "Julia"]],
  [PL, ["Jan", "Kacper", "Zuzanna", "Lena"]],
  [PT, ["João", "Santiago", "Maria", "Matilde"]],
  [PT_BR, ["Enzo", "Miguel", "Alice", "Sophia"]],
  [RU, ["Саша", "Макс", "София", "Аня"]],
  [SK, ["Jakub", "Lukáš", "Sofia", "Ema"]],
  [TR, ["Mehmet", "Ali", "Ayşe", "Zeynep"]],
  [UK, ["Олесь", "Макс", "Софія", "Марія"]],
];

const players = Object.fromEntries(
  nameEntries.map(([locale, names]) => [locale, getLocalizedPlayers(names)]),
);

export default players;
