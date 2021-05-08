import { createContext } from "react";

import { Player } from "../../utils/types";

const PlayerContext = createContext<Player | undefined>(undefined);

export default PlayerContext;
