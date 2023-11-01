import { type IntlShape } from "react-intl";

import * as apocalypse from "./apocalypse";
import * as booty from "./booty";
import * as cthulhu from "./cthulhu";
import * as legends from "./legends";
import * as munchkin from "./munchkin";
import * as star from "./star";
import * as superMunchkin from "./super";

export default Object.fromEntries(
  [apocalypse, booty, cthulhu, legends, munchkin, star, superMunchkin].map(
    (theme) => [
      theme.key,
      {
        ...theme,
        name: (intl: IntlShape) => intl.formatMessage(theme.name),
      },
    ],
  ),
);
