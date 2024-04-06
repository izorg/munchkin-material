import { defineMessages } from "react-intl";

// eslint-disable-next-line formatjs/enforce-id
export default defineMessages({
  epic: {
    defaultMessage: "Epic Munchkin ({minLevel} - {maxLevel})",
    id: "levelLimit.epic",
  },
  label: {
    defaultMessage: "Level limit",
    id: "levelLimit.label",
  },
  munchkin: {
    defaultMessage: "Munchkin ({minLevel} - {maxLevel})",
    id: "levelLimit.munchkin",
  },
  none: {
    defaultMessage: "No limit",
    id: "levelLimit.none",
  },
});
